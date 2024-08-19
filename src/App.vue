<script setup>
// vueファイルはhtmlタグのような，script, template, styleから成り立つ．
// scriptタグにはjsを記述することが可能．

import { ref } from "vue"

const title = ref("Hello Vue.js")
// let price = 10
// refをimportすることで，再レンダリングが可能になる．
let price = ref(10)
// 値の更新もvalueを使う．自動でvalueがついてくれる．
// prove.value = 3

function increment() {
  // このままだと更新後の値がレンダリングされない
  //   price++
  //   console.log(price)

  // reactのrefに似てる．refオブジェクトからvalueの値を取得する．
  price.value++
  console.log(price)
}
// オブジェクトもrefに入れることが可能．
const info = ref({
  students: 1000,
  rating: 4
})
console.log(info.value.students)
</script>
<template>
  <!-- templateにはhtmlを書くことが可能． -->
  <!-- bladeファイルのように二重鉤括弧で定数を表示することができる． -->
  <h1>Title: {{ title }}</h1>
  <!-- templateにおいては.valueをつけなくても良い．自動でオブジェクトかどうかチェックしてくれる． -->
  <!-- .valueをつけると，price.value.valueとなってしまう． -->
  <h2>${{ price / 2 }}</h2>
  <!-- ボタンが押された時の処理は，@click="関数"とする-->
  <button @click="increment">button</button>
  <h2>{{ info.students }}</h2>
</template>
<style>
/* styleにはcssを書くことが可能． */
h1 {
  color: red;
}
</style>

<!-- scriptやstyleはなくても動作する． -->
<!-- templateはないとエラーが出る． -->
