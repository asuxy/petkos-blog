import CreatePostForm from "@/components/forms/create-post-form";
import { getCategories } from "@/lib/actions/blog-actions";

export default async function NewPost() {
    const categoryList = await getCategories();

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
            <CreatePostForm categories={categoryList} />
        </div>
    );
}