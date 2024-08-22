<script setup>
// vueファイルはhtmlタグのような，script, template, styleから成り立つ．
// scriptタグにはjsを記述することが可能．

import { ref, reactive } from "vue"

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
  info.value.rating++
  instructor.age++ // valueをつけなくても良い．
  instructor.bio = "hey!"
  // reactiveオブジェクトにあるrefオブジェクトは.valueをつける必要がない．
  instructor.email = ref("test@test.com")
  console.log(price)
}
// オブジェクトもrefに入れることが可能．
const info = ref({
  students: 1000,
  rating: 4
})
console.log(info.value.students)
// しかし元々オブジェクトなので，オブジェクトで管理するrefを使うのは二度手間なので，元からリアクティブにしたい．
const instructor = reactive({
  //refオブジェクトではなく，reactiveオブジェクトという．
  name: "John",
  age: 30,
  //ネストしたオブジェクトもリアクティブになる．
  sns: {
    twitter: "@test",
    github: "test"
  },
  email: ref("john@test.com") // refオブジェクトをネストしても良い．
})
instructor.bio = "hello!" //reactiveオブジェクトは後からプロパティを追加することが可能．
console.log(instructor.name) //valueをつけなくても良い．
console.log(instructor.email) // 毎回refオブジェクトかどうかをチェックしている．この場合がreactiveオブジェクトであることを認識している．

// reactiveオブジェクトのなかのrefオブジェクトでも配列の場合は.valueをつける必要がある．
// 配列にはさまざまなメソッドがあるため
const items = reactive([ref(1), ref(2), 3])
items.reverse()
console.log(items[1].value)
// MEMO: 公式ドキュメントはref関数を使うことを推奨している．

// 普通のオブジェクト内にref関数がある場合
const courseInfo = {
  sections: ref(10),
  language: ref("Japanese")
}
console.log(courseInfo.sections.value)
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
  <h3>{{ info.rating }}</h3>
  <h2>{{ instructor.age }}</h2>
  <h2>{{ instructor.bio }}</h2>
  <h2>{{ instructor.sns.twitter }}</h2>
  <h2>{{ instructor.email }}</h2>
  <!-- 先頭から見るため，普通のオブジェクト内のrefオブジェクトは.valueをつける必要がある-->
  <h2>{{ courseInfo.sections.value + 1 }}</h2>
  <!-- <h2>{{ courseInfo.sections.value }}</h2> なくてもできるがつける方がいい-->
</template>
<style>
/* styleにはcssを書くことが可能． */
h1 {
  color: red;
}
</style>

<!-- scriptやstyleはなくても動作する． -->
<!-- templateはないとエラーが出る． -->
