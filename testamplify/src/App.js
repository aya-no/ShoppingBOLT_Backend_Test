import { Amplify } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import './App.css';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { createRecipeAPI, fetchRecipeAPI, fetchIdRecipeAPI, deleteRecipeAPI, dataClearAPI, createRecipeItemAPI, fetchRecipeItemAPI } from './api';
Amplify.configure(awsExports);

function App({ user }) {
  const [recipe, setRecipe] = useState([]);
  const [recipeItem, setRecipeItem] = useState([]);
  const [recipeId, setRecipeId] = useState([]);

  const [inputValue, setInputValue] = useState('');
  const [idInputValue, setIdInputValue] = useState("");

  useEffect(() => {
    // レシピの一覧データの取得
    const fetchRecipeList = async () => {
      const data = await fetchRecipeAPI()
      setRecipe(JSON.parse(data))
    }
    fetchRecipeList();
    // レシピ材料の一覧データの取得
    const fetchRecipeItemList = async () => {
      const data = await fetchRecipeItemAPI()
      setRecipeItem(JSON.parse(data))
    }
    fetchRecipeItemList();
  }, [])

  // レシピ名登録ようインプットフォームが変更されたらsetInputValueを変更
  const handleOnChange = (value) => {
    setInputValue(value)
  }

  // レシピの登録
  async function sendRecipe(recipe) {
    // レシピ登録ダミーデータ
    const data = {
      recipe: recipe,
      memo: "メモはこんな感じ",
      url: "http://yahoo.co.jp",
      serving: 2,
      category1: "主菜",
      category2: "中華"
    }
    // レシピを登録するAPI呼び出し
    await createRecipeAPI(data)
    setInputValue('')
  }

  // レシピIDを入力したらSet DaleteInputValueを変更
  const DeleteInputValueOnChange = (value) => {
    setIdInputValue(value)
  }

  // レシピの削除
  async function deleteRecipe(data) {
    await deleteRecipeAPI(data);
    // setIdInputValue("");
  }

  // レシピの取得（id）指定
  async function fetchIdRecipe(id) {
    const recipe = await fetchIdRecipeAPI(id);
    const idRecipe = JSON.parse(recipe[0])
    console.log(idRecipe)
    setRecipeId(idRecipe);
    // setIdInputValue("");
  }

  // レシピ材料の登録
  async function sendRecipeItem() {
    const data = {
      recipeItem: "にんじん" + user.attributes.sub,
      quantity: 2,
      corner: "野菜",
      unit: "個"
    }
    // レシピ材料を登録するAPI呼び出し
    await createRecipeItemAPI(data)
  }

  async function signOut() {
    try {
      await Auth.signOut();
      await dataClearAPI();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }


  return (
    <>
      <h1>Hello {user.attributes.email} </h1>
      <h3>ログインユーザー：{user.attributes.sub}</h3>
      <button onClick={signOut}>Sign out</button>

      {/* {console.log(user)} */}

      <h2>レシピ一覧の取得↓</h2>
      {recipe && recipe.map((recipe, index) => {
        return (
          <div key={index}>
            {/* {console.log("recipe;", recipe)} */}
            ⭐️レシピ名 : {recipe.recipe}
            ⭐️id : {recipe.id}
            ⭐️RecipeItems : {recipeItem.RecipeItems}
          </div>
        )
      })}
      <h2>レシピ材料一覧の取得↓</h2>
      {recipeItem && recipeItem.map((recipeItem, index) => {
        return (
          <div key={index}>
            {/* {console.log("recipeItem:", recipeItem)} */}
            ⭐️レシピ材料名 : {recipeItem.recipeItem}
            ⭐️id : {recipeItem.id}
            ⭐️recipeID : {recipeItem.recipeID}
          </div>
        )
      })}
      <h2>レシピの登録↓</h2>
      <input type='text' value={inputValue} onChange={(e) => handleOnChange(e.target.value)} />
      <button onClick={() => sendRecipe(inputValue)}>レシピ名を登録</button>
      <h2>レシピの材料登録↓</h2>
      <button onClick={() => sendRecipeItem()}>レシピダミー材料を登録</button>
      <h2>IDを入力してレシピの削除・取得）</h2>
      <input type='text' value={idInputValue} onChange={(e) => DeleteInputValueOnChange(e.target.value)} />
      <button onClick={() => deleteRecipe(idInputValue)}>レシピを削除</button>
      <button onClick={() => fetchIdRecipe(idInputValue)}>レシピを取得</button>
      <h3>IDから取得したレシピ</h3>
      {recipeId}
    </ >
  );
}

export default withAuthenticator(App);
