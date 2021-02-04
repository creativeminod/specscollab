require('isomorphic-fetch'); 
const Koa = require('koa');
const koaSend = require('koa-send');
const Router = require('koa-router');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const dotenv = require('dotenv');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const multer = require('@koa/multer')
const path = require('path');
const cors = require('koa-cors')
dotenv.config();
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');

const port = parseInt(process.env.PORT, 10) || 5036;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(session({ sameSite: 'none', secure: true }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_content', 'read_products', 'write_products','write_script_tags','read_themes','write_themes'],
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set('accessToken', accessToken);
        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        });
        ctx.redirect('/');
      },
    }),
  );
  server.use(cors());
  server.use(graphQLProxy({version: ApiVersion.October19}))
  server.use(router.routes());
  server.use(verifyRequest());
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;

  });

  router.get('/assets/:object', async ctx => koaSend(ctx, ctx.path, {
    root: __dirname+"/public/",
  }));

  router.get('/fileupload/:object', async ctx => koaSend(ctx, ctx.path, {
    root: __dirname+"/public/",
  }));

  router.get('/api/:object', async (ctx) => {
    try {
      console.log(ctx.params.object);
      const results = await fetch("https://" + ctx.cookies.get('shopOrigin') + "/admin/api/2019-10/themes/" + ctx.params.object + "/assets.json", {
        headers: {
          "X-Shopify-Access-Token": ctx.cookies.get('accessToken'),
        },
      })
      .then(response => response.json())
      .then(json => {
        return json;
      });
      ctx.body = {
        status: 'success',
        data: results
      };
    } catch (err) {
      console.log(err)
    }
  });
  router.post('/user/:object', async (ctx) => {
    try {
      console.log(ctx.params.object);
      const results = await fetch("https://" + ctx.cookies.get('shopOrigin') + "/admin/api/2019-10/products/" + ctx.params.object + "/images.json", {
        headers: {
          "X-Shopify-Access-Token": ctx.cookies.get('accessToken'),
        }
      })
      .then(response => response.json())
      .then(json => {
        return json;
      });
      ctx.body = {
        status: 'success',
        data: results
      };
    } catch (err) {
      console.log(err)
    }
  });
  

  const storage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, path.join(__dirname ,'/public/fileupload'))
      },
      filename: function (req, file, cb) {
          let type = file.originalname.split('.')[1]
          cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
      }
  })
  //File upload restrictions
  const limits = {
      fields: 10,//Number of non-file fields
      fileSize: 50 * 1024 * 1024,//File Size Unit b
      files: 12//Number of documents
  }
  const upload = multer({storage,limits})

  router.post('/users/file', upload.single('file'), async (ctx,next)=>{
      ctx.body = {
          code: 1,
          data: ctx.file,
          imageurl: 'https://' +ctx.host+'/fileupload/'+ctx.file.filename,
      }
  });
  router.post('/admin/file', upload.array('image_upload'), async (ctx,next)=>{
      ctx.body = {
          code: 1,
          data: ctx.files,
          imagepath: 'https://' +ctx.host+'/fileupload/',
      }
  });
  router.post('/admin/presfile', upload.single('image_upload'), async (ctx,next)=>{
      console.log(ctx.file);
      ctx.body = {
          code: 1,
          data: ctx.file,
          imageurl: 'https://' +ctx.host+'/fileupload/'+ctx.file.filename,
      }
  });

  server.use(router.routes()).use(router.allowedMethods())

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});