import { Amplify } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import './App.css';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { createRecipeAPI, fetchRecipeAPI, deleteRecipeAPI, dataClearAPI, createRecipeItemAPI } from './api';
Amplify.configure(awsExports);

function App({ user }) {
  const [recipe, setRecipe] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [deleteInputValue, setDaleteInputValue] = useState("");

  useEffect(() => {
    // レシピの一覧データの取得
    const fetchRecipeList = async () => {
      const data = await fetchRecipeAPI()
      setRecipe(JSON.parse(data))
    }
    fetchRecipeList();
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
    setDaleteInputValue(value)
  }

  // レシピの削除
  async function deleteRecipe(data) {
    await deleteRecipeAPI(data);
    setDaleteInputValue("");
  }



  // レシピ材料の登録
  async function sendRecipeItem() {
    const data = {
      recipeItem: "牛肉" + user.attributes.sub,
      quantity: 200,
      corner: "肉"
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
      <h1>Hello {user.attributes.email} id{user.attributes.sub}</h1>
      <button onClick={signOut}>Sign out</button>

      {/* {console.log(user)} */}

      <h2>レシピの一覧の取得↓</h2>

      {recipe && recipe.map((recipe, index) => {
        return (
          <div key={index}>
            {/* {console.log(recipe)} */}
            {recipe.recipe}  id:{recipe.id} 登録ユーザー:{recipe.owner}
          </div>
        )
      })}
      <h2>レシピの登録↓</h2>
      <input type='text' value={inputValue} onChange={(e) => handleOnChange(e.target.value)} />
      <button onClick={() => sendRecipe(inputValue)}>レシピ名を登録</button>
      <h2>レシピの材料登録↓</h2>
      <button onClick={() => sendRecipeItem()}>レシピダミー材料を登録</button>
      <h2>レシピの削除（レシピIDを入力して削除</h2>
      <input type='text' value={deleteInputValue} onChange={(e) => DeleteInputValueOnChange(e.target.value)} />
      <button onClick={() => deleteRecipe(deleteInputValue)}>レシピを削除</button>
    </ >
  );
}

export default withAuthenticator(App);
