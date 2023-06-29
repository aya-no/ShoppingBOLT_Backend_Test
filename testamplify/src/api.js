import { DataStore } from "aws-amplify";
import { Recipe, RecipeItem } from './models'

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

// レシピItemの作成
export const createRecipeItemAPI = async (data) => {
    const { recipeItem, quantity, corner } = data;
    try {
        await DataStore.save(
            new RecipeItem({
                recipeItem,
                quantity,
                corner
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
        // const deleterecipe = await DataStore.query(Recipe, r => r.id.eq(id));
        // DataStore.delete(JSON.stringify(deleterecipe, null, 2))
        // console.log("削除レシピ:", JSON.stringify(deleterecipe, null, 2));
        const deleterecipe = await DataStore.query(Recipe, id);
        DataStore.delete(Recipe, deleterecipe)

    } catch (err) {
        throw err;
    }
}