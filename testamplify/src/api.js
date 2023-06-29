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

// レシピ材料の作成
export const createRecipeItemAPI = async (data) => {
    const { recipeItem, quantity, corner, unit } = data;
    try {
        await DataStore.save(
            new RecipeItem({
                recipeItem,
                quantity,
                corner,
                unit,
            })
        );
        console.log("レシピ材料登録完了")
    } catch (err) {
        throw err;
    }
};


// レシピ一覧の取得
export const fetchRecipeAPI = async () => {
    try {
        const recipeList = await DataStore.query(Recipe);
        return JSON.stringify(recipeList, null, 2);
    } catch (err) {
        throw err;
    }
}

// レシピの取得（id)指定
export const fetchIdRecipeAPI = async (id) => {
    try {
        const recipe = await DataStore.query(Recipe, r => r.id.eq(id));
        console.log("recipe:", JSON.stringify(recipe[0], null, 2))
        // let item;

        // const recipeItem = recipeList[0].RecipeItems.values.then(item => item = JSON.stringify(item, null, 2))
        // console.log(recipeItem)

        return JSON.stringify(recipe[0], null, 2);
    } catch (err) {
        throw err;
    }
}

// レシピ材料一覧の取得
export const fetchRecipeItemAPI = async () => {
    try {
        const recipeList = await DataStore.query(RecipeItem);
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