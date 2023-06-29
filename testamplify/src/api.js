import { DataStore } from "aws-amplify";
import { Recipe } from './models'

// ログアウト時にローカルデータをクリアする
export const dataClearAPI = async () => {
    try {
        await DataStore.clear();

    } catch (err) {
        throw err;
    }
}

// レシピの作成
export const createRecipeAPI = async (data) => {
    const { recipe, memo, url, serving, category1, category2, userName } = data;
    try {
        await DataStore.save(
            new Recipe({
                recipe,
                memo,
                url,
                serving,
                category1,
                category2,
                userName
            })
        );
    } catch (err) {
        throw err;
    }
};

// レシピの取得
export const fetchRecipeAPI = async () => {
    try {
        const recipeList = await DataStore.query(Recipe);
        return JSON.stringify(recipeList, null, 2);
    } catch (err) {
        throw err;
    }
}

// レシピの削除
export const deleteRecipeAPI = async (id) => {
    try {
        const recipe = await DataStore.query(Recipe, r => r.id());

    } catch (err) {
        throw err;
    }
}