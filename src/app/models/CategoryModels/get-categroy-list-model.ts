import { GetBlogListModel } from "../BlogModels/get-blog-list-model";


export class GetCategoryListModel {
    id: string = "";
    categoryName: string = "";
    blogs: GetBlogListModel[] = [];
}