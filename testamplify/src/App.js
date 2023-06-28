import { Amplify } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import './App.css';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { createRecipeAPI, fetchRecipeAPI } from './api';
Amplify.configure(awsExports);

function App({ signOut, user }) {
  const [recipe, setRecipe] = useState([]);
  const [inputValue, setInputValue] = useState('');

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
    const sendRecipe = {
      recipe: recipe,
      memo: "メモはこんな感じ",
      url: "http://yahoo.co.jp",
      serving: 2,
      category1: "主菜",
      category2: "中華",
      userName: user.attributes.sub
    }
    // レシピを登録するAPI呼び出し
    await createRecipeAPI(sendRecipe)
    setInputValue('')
  }


  return (
    <>
      <h1>Hello {user.attributes.sub}</h1>
      <button onClick={signOut}>Sign out</button>

      {console.log(recipe)}

      <h2>レシピの一覧の取得↓</h2>

      {recipe && recipe.map((recipe, index) => {
        return (
          <div key={index}>
            {recipe.recipe}
          </div>
        )
      })}
      <h2>レシピの登録↓</h2>
      <input type='text' value={inputValue} onChange={(e) => handleOnChange(e.target.value)} />
      <button onClick={() => sendRecipe(inputValue)}>送信</button>
    </ >
  );
}

export default withAuthenticator(App);
