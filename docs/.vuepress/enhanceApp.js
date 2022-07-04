import VueNotification from "vue-notification/dist/ssr.js";
import VueSelect from "vue-select";
import "vue-select/src/scss/vue-select.scss";
import Pagination from "vue-pagination-2";

export default ({ Vue, options, router, siteData }) => {
  Vue.use(VueNotification);
  Vue.component("v-select", VueSelect);
  Vue.component("v-pagination", Pagination);

  Vue.extend({
    mixins: [
      {
        data() {
          return {
            appId: ""
          };
        }
      }
    ]
  });

  if (typeof process === "undefined" || process.env.VUE_ENV !== "server") {
    router.onReady(() => {
      const { app } = router;

      app.$once("hook:mounted", () => {
        setTimeout(() => {
          const { hash } = document.location;
          if (hash.length > 1) {
            const id = decodeURIComponent(hash.substring(1));
            const element = document.getElementById(id);
            if (element) element.scrollIntoView();
          }
        }, 500);
      });
    });
  }
};
