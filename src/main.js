import { createApp } from "vue"
import App from "./App.vue"
// default import ができるように自動でvueファイルからjsに変換している．
// vueファイルを使用するときはdefault importを使用する．

console.log(App) // 実はオブジェクトになる(余談)

const app = createApp(App) // Appコンポーネントを基に，UIを生成．
app.mount("#app") // インターフェースを#appに表示．指定方法はcssセレクタと同様．
