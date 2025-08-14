import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: 'myuserscripts9139903',
        description: 'test',
        author: 'test',
        license: 'MIT',
        icon: '',
        namespace: 'https://github.com/gq9ykm/myuserscripts',
        match: ['https://music.163.com/*'],
        grant: ['unsafeWindow', 'GM_addStyle', 'GM_xmlhttpRequest', 'GM_download', 'GM_getValue', 'GM_setValue', 'GM_registerMenuCommand', 'GM_cookie'],
        'run-at': 'document-start',
      },

      build: {
        fileName: 'ncmExtend.user.js',
        externalGlobals: {
          sweetalert2: cdn.jsdelivrFastly('sweetalert2', 'dist/sweetalert2.all.min.js'),
          'ajax-hook': cdn.jsdelivrFastly('ajax-hook', 'dist/ajaxhook.min.js'),
          jsmediatags: cdn.jsdelivrFastly('jsmediatags', 'dist/jsmediatags.min.js'),
          'node-forge': cdn.jsdelivrFastly('node-forge', 'dist/forge.min.js')
        },
      }
    }),
  ],
});
