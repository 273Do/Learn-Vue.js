<!-- vueファイルは全てJavascriptにコンパイルされる -->
<script setup>
import { ref } from "vue"
const count = ref(2)
const count2 = ref(4)

const message = ref("<h1>Hello</h1>")

const vueUrl = ref("https://vue.js.org")
const id = ref("vue-link")

function handleClick(e, times) {
  count.value++
  console.log(e) // イベントオブジェクトを取得できる
  count.value = e.clientX * times
}
</script>
<!-- htmlではなく，テンプレート構文と呼ばれる -->
<!-- htmlの文法に従う範囲の中で独自のルールを設定している -->
<template>
  <!-- テンプレート構文 -->
  <div>
    <h3>テンプレート構文</h3>
    <!-- 波括弧の中には単一の式を入れることが可能 -->
    <div>{{ count + count2 }}</div>
    <div>{{ count > 3 ? "yes" : "no" }}</div>
    <!-- v-textで変数countの中身を描画できる({{}}があるので基本は使わない) -->
    <!-- vueはvから始まる独自のディレクティブが用意されている -->
    <hr />
  </div>
  <!-- v-text -->
  <div>
    <h3>v-text</h3>
    <div v-text="count"></div>
    <!-- そのまま書くとh1タグはテキストとして出てしまう -->
    <!-- <div>{{ message }}</div> -->
    <div v-html="message"></div>
    <hr />
  </div>
  <!-- v-bind -->
  <div>
    <h3>v-bind</h3>
    <!-- MEMO: ディレクティブの前にv-bind:(:)をつけてあげると動的に属性値を設定ことができる -->
    <!-- :id="id"のように属性名と変数名が同じときは省略可能 -->
    <a :id :href="vueUrl">Vue.js</a>
    <!-- オブジェクトでまとめることも可能 -->
    <a v-bind="{ id: id, href: vueUrl }">Vue.js</a>
    <br />
    <!-- undefinedやnullを指定すると属性が消える -->
    <a :id="undefined" :href="null">undefined</a>
    <br />
    <!-- falseで消える属性もある：hiddenやchecked などのbool型 -->
    <button :disabled="false">button</button>
    <hr />
  </div>
  <!-- v-on -->
  <div>
    <h3>v-on</h3>
    <!-- MEMO: ディレクティブの前にv-on:動作=をつけてあげると動作によって処理を実行できる -->
    <!-- onClickとかに近い．v-on:clickだと@に省略される -->
    <button @click="count = $event.clientX">click me</button>
    <button @click="handleClick($event, 3)">increment</button>
    <p>{{ count }}</p>
    <hr />
  </div>
  <!-- イベント修飾子 -->
  <div>
    <h3>イベント修飾子</h3>
    <p>{{ count }}</p>
    <div @click="count++">
      <!-- stopPropagation:親要素からクリックしたことを伝えない -->
      <button @click="$event.stopPropagation()">button</button>
    </div>
    <div @click="count++">
      <!-- vueで用意されている書き方 -->
      <button @click.stop="">button</button>
    </div>
    <!-- デフォルトの挙動を防ぐ -->
    <a href="https://vue.js.org" @click="$event.preventDefault()">Vue.js</a>
    <!-- vueで用意されている書き方 -->
    <a href="https://vue.js.org" @click.prevent="">Vue.js</a>
    <!-- これらを実行した上で処理をしたい場合は""に処理を記述 -->
    <!-- =""を消してもok，組み合わせることも可能 -->
    <a href="https://vue.js.org" @click.prevent.stop>Vue.js</a>
    <hr />
  </div>
</template>
