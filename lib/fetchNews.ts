import { gql } from "graphql-request"
import sortNewsbyImages from "./sortNewsByImages";


const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean,
) => {

    const query = gql`
    query MyQuery( 
      $access_key: String!
      $category: String! 
      $keywords: String
    ) {
        myQuery(
            access_key: $access_key 
            categories: $categories
            countries: "gb" 
            sort: "published_desc"
            keywords: $keywords
            ) {
          data {
            author
            category
            image
            country
            language
            published_at
            source
            title
            url
          }
          pagination {
            count
            limit
            offset
            total
          }
        }
}  
`;


const res = await fetch("https://camposdojordao.stepzen.net/api/ha-news/__graphql",{
    method: 'POST', 
    cache: isDynamic? "no-cache" : "default", 
    next: isDynamic?{revalidate: 0}: {revalidate: 20}, 
    headers: {
        'Content-Type': 'application/json', 
        Authorization: `ApiKey ${process.env.STEPZEN_API_KEY}`
    }, 
    body: JSON.stringify({ 
        query, 
        variables: {
            access_key: process.env.MEDIASTACK_API_KEY, 
            categories: category, 
            keywords: keywords,
        }, 
    }),
}); 

console.log("Loading new data from API for category...", 
category,keywords); 

const newsResponse = await res.json(); 

const news = sortNewsbyImages(newsResponse.data.myQuery);
return news;
};

export default fetchNews;

// stepzen import curl "http://api.mediastack.com/v1/news?access_key=fd194266db25962493281f86a053ff4c%sources=business,sports"