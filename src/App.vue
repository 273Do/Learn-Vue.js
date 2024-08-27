<!-- vueファイルは全てJavascriptにコンパイルされる -->
<script setup>
import { ref, computed, watchEffect, watch } from "vue"
const count = ref(2)
const count2 = ref(4)
const count3 = ref(6)

const message = ref("<h1>Hello</h1>")

const vueUrl = ref("https://vue.js.org")
const id = ref("vue-link")

function handleClick(e, times) {
  count.value++
  console.log(e) // イベントオブジェクトを取得できる
  count.value = e.clientX * times
}

const eventName = "keyup"

const userInput = ref("")

const score = ref(0)
// scoreは最初は0なので常にbadになる
// const evaluation = score.value > 3 ? "good" : "bad"
// 以下も同様
// const evaluation = red(score.value > 3 ? "good" : "bad")
// リアクティブシステムを保ったまま処理を一つにまとめるのにcomputedを使う
// computed refオブジェクトと呼ぶ
const evaluation = computed(() => {
  console.log("computed")
  // 副作用を避ける
  // NG: 非同期処理を行うとエラーが出る
  // setTimeout(() => {
  //   console.log("setTimeout")
  // }, 1000)
  // NG
  // score.value++

  // .valueに返り値が格納される
  // 実行中にアクセスしたリアクティブなデータを常に監視する
  // 一つでもそのデータが更新されたら再評価されるため，更新される
  // return score.value > 3 ? "good" : "bad"
  return tmp() // 他の関数内のリアクティブなデータも監視される(リアクティブエフェクト)
})
const tmp = () => {
  console.log("tmp")
  return score.value > 3 ? "good" : "bad"
}
console.log(evaluation.value)
// 注意点 //
// computedはデータをセットすることはできない．(読み取り専用)
// evaluation.value = "hi"
// 副作用を避ける．computed関数の外の変数の値を変更しない．非同期処理を行わない．

// watchEffect(() => {
//   console.log("watchEffect")
//   console.log(count.value, count3.value) // どっちか更新されるたびに更新される
//   // 非同期処理も可能
//   setTimeout(() => {
//     console.log("after 1s")
//     console.log(count.value) // 監視されない
//   }, 1000)
//   // count.value = "hey"
// })

// const test = ref({ a: 1, b: 2 })
// 第二引数に引数を二つ取ることができ，新しい値と古い値を取得できる
watch(
  // count
  // [count, count3] // 配列で複数のデータを監視することも可能
  // () =>test.value.a //オブジェクトの中身を監視するときは関数を使う
  () => {
    console.log("watch first argument")
    return count.value + count3.value
    // return 0 //
  },
  (newValue, oldValue) => {
    // newValue, oldValueの値が同じであれば以下は実行されない
    console.log("watch")
    console.log(count.value, count3.value) // 指定した値が更新されるたびに更新される
    // 非同期処理も可能
    // setTimeout(() => {
    //   console.log("after 1s")
    //   console.log(count.value) // 監視されない
    // }, 1000)
    console.log("newValue, oldValue")
    console.log(newValue, oldValue)
  },
  {
    immediate: true // 初期ロード時にも実行される
  }
)
// 一つ目の引数に監視したいデータ，二つ目に変更後に実行したいコールバック関数
// 第一引数にはrefオブジェクトかりアクティブオブジェクトを指定するため，.valueをつけなくても良い．
// 第一引数に関数を入れると，watchEffectと同じように動作する．

const isRed = ref(true)
const isBgBlue = ref(true)
const toggleClass = () => {
  isRed.value = !isRed.value
  isBgBlue.value = !isBgBlue.value
  // className.value = "bg-blue"
}
const className = ref("red")
</script>
<!-- htmlではなく，テンプレート構文と呼ばれる -->
<!-- htmlの文法に従う範囲の中で独自のルールを設定している -->
<template>
  <!-- テンプレート構文で変数の中身を表示 -->
  <div>
    <h3>テンプレート構文で変数の中身を表示</h3>
    <!-- 波括弧の中には単一の式を入れることが可能 -->
    <div>{{ count + count2 }}</div>
    <div>{{ count > 3 ? "yes" : "no" }}</div>
    <!-- v-textで変数countの中身を描画できる({{}}があるので基本は使わない) -->
    <!-- vueはvから始まる独自のディレクティブが用意されている -->
    <hr />
  </div>
  <!-- v-text で要素の値を変数に変更 -->
  <div>
    <h3>v-text で要素の値を変数に変更</h3>
    <div v-text="count"></div>
    <!-- そのまま書くとh1タグはテキストとして出てしまう -->
    <!-- <div>{{ message }}</div> -->
    <div v-html="message"></div>
    <hr />
  </div>
  <!-- v-bind で動的に属性値を変更 -->
  <div>
    <h3>v-bind で動的に属性値を変更</h3>
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
  <!-- v-on で動作によって処理を実行 -->
  <div>
    <h3>v-on で動作によって処理を実行</h3>
    <!-- MEMO: ディレクティブの前にv-on:動作=をつけてあげると動作によって処理を実行できる -->
    <!-- onClickとかに近い．v-on:clickだと@に省略される -->
    <button @click="count = $event.clientX">click me</button>
    <button @click="handleClick($event, 3)">increment</button>
    <p>{{ count }}</p>
    <hr />
  </div>
  <!-- イベント修飾子 で要素の動作を変更-->
  <div>
    <h3>イベント修飾子 で要素の動作を変更</h3>
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
  <!-- キー修飾子 でキーの動作によって処理を実行-->
  <div>
    <h3>キー修飾子 でキーの動作によって処理を実行</h3>
    <p>{{ count }}</p>
    <!-- 文字を入力するたびに発火 -->
    <input type="text" @keyup="count++" />
    <!-- 特定のキーのみに反応 @keyup.キー 繋げることで複数設定可能 -->
    <input type="text" @keyup.enter.delete="count++" />
    <hr />
  </div>
  <!-- ディレクティブの構造 -->
  <div>
    <h3>ディレクティブの構造</h3>
    <div>
      <p>v-on:click.prevent="changeData</p>
      <p>名前:引数:修飾子="値"</p>
    </div>
  </div>
  <!-- ディレクティブの引数を動的に変更 -->
  <div>
    <h3>ディレクティブの引数を動的に変更</h3>
    <p>{{ count }}</p>
    <!-- 他のディレクティブも使用可能 -->
    <input type="text" @[eventName].enter.delete="count++" />
    <hr />
  </div>
  <!-- v-model inputなどで入力されたデータを扱う-->
  <div>
    <h3>v-model inputなどで入力されたデータを扱う</h3>
    <p>{{ userInput }}</p>
    <input v-model="userInput" type="text" />
    <!-- userInputをjsで更新したらinputの部分も変わる -->
    <button @click="userInput = 'hey'">button</button>
    <hr />
  </div>
  <!-- computed で複雑な式を一つにまとめる-->
  <div>
    <!-- computedはリアクティブシステムを保ったまま処理を一つにまとめる -->
    <h3>computed で複雑な式を一つにまとめる</h3>
    <p>{{ score }}</p>
    <!-- 以下の式は長いので定数にまとめたい -->
    <p>{{ score > 3 ? "good" : "bad" }}</p>
    <p>computed:{{ evaluation }}</p>
    <!-- computedを使わなくても関数呼び出しでも動作する -->
    <p>no computed:{{ tmp() }}</p>
    <!-- 再レンダリングごとに関数が実行されるので予期しないタイミングで動作してしまう．computedを使用すべき -->
    <button @click="score++">+1</button>
    <hr />
  </div>
  <!-- watch でリアクティブなデータの変更を監視-->
  <div>
    <h3>watch でリアクティブなデータの変更を監視</h3>
    <!-- reactのuseEffectみたいなもの -->
    <!-- watchEffectとwatchの違いは，明示的に監視したいデータを指定するかどうか -->
    <!-- 前者は -->
    <!-- 非同期処理も可能 -->
    <p>{{ count }}</p>
    <p>{{ count3 }}</p>
    <button @click="count++">count++</button>
    <button @click="count3++">count3++</button>
    <hr />
  </div>
  <!-- class属性を動的に変更 -->
  <div>
    <h3>class属性を動的に変更</h3>
    <div class="red bg-blue">hello</div>
    <!-- オブジェクトで動的にクラスを変更可能 -->
    <!-- keyとT/Fで切り替え可能 -->
    <div :class="{ red: isRed, 'bg-blue': isBgBlue }">hello</div>
    <!-- class名を動的に指定する方法 -->
    <div :class="[className, 'bg-blue']">hello</div>
    <div class="border" :class="[className, { 'bg-blue': isBgBlue }]">hello</div>
    <!-- 普通の静的なclassも同時に書ける -->
    <button @click="toggleClass">toggle</button>
    <hr />
  </div>
  <!-- style属性を動的に変更 -->
  <div>
    <h3>style属性を動的に変更</h3>
    <div style="color: red; background-color: blue">hello</div>
    <!-- オブジェクトで，cssの記述をそのままできる -->
    <!-- background-colorではなくbackgroundColorでもok -->
    <div :style="{ color: 'red', backgroundColor: 'blue' }">hello</div>
  </div>
</template>
<style>
.red {
  color: red;
}
.bg-blue {
  background-color: blue;
}
.border {
  border: 1px solid green;
}
</style>
