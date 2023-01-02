type Article = {
    author: string | null; 
    category: string; 
    content: string; 
    description: string; 
    image: string; 
    language: string; 
    published_at: string; 
    source: string; 
    title: string; 
    url: string;
};


type Pagenation = {
    count:Int;
    limit:Int; 
    offset:Int;
    total:Int;
};

type NewsResponse = {
    pagination: Pagenation; 
    data: Article[];
};

type Category = 
| "general"
| "business"
| "entertainment"
| "health"
| "science"
| "sports"
| "technology";