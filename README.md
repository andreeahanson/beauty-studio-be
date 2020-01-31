# Beauty Studio API

This API consists of data on beauty products for which the user has notes. The user can view, add, modify or delete notes about products. API access is through HTTP. Data is sent and received as JSON.

### URL:

to be added soon ...

## BEAUTY PRODUCTS NOTES ENDPOINTS

#### GET all the beauty products with notes:

```/beauty_products```

*Example request*

```GET '/beauty_products'```

*Example response*

```
[
    {
        "id": 1,
        "name": "Blush",
        "brand": "Maybeline",
        "created_at": "2020-01-25T01:11:37.696Z",
        "updated_at": "2020-01-25T01:11:37.696Z"
    },
    {
        "id": 2,
        "name": "Mascara",
        "brand": "Maybeline",
        "created_at": "2020-01-25T02:05:21.522Z",
        "updated_at": "2020-01-25T02:05:21.522Z"
    }
]
```

#### GET a specific beauty product:

```/beauty_products/<beauty product id>```

*Example request*

```GET '/beauty_products/1'```

*Example response*

```
    {
        "id": 1,
        "name": "Blush",
        "brand": "Maybeline",
        "created_at": "2020-01-25T01:11:37.696Z",
        "updated_at": "2020-01-25T01:11:37.696Z"
    }
```


#### GET all the notes:

```/notes```

*Example request*

```GET '/notes'```

*Example response*

```
[
    {
        "id": 12,
        "note": "I love green",
        "beauty_product_id": 1,
        "created_at": "2020-01-28T03:49:08.643Z",
        "updated_at": "2020-01-28T03:49:08.643Z"
    }
]
```

#### POST a new beauty product:

```/beauty_products```

*Example request*

```POST '/beauty_products'```

*Required parameters*

```
Headers:  "Content-Type": "application/json"

Body: 
{
  "name": <String>,
  "brand" : <String>
}
```

*Example response*

```
[
    {
        "id": 414,
        "name": "Mascara",
        "brand": "Maybelline",
        "created_at": "2019-08-18T06:18:36.193Z",
        "updated_at": "2019-08-18T06:18:36.193Z"
    }
]
```


#### POST a new note:

```/beauty_products/<beauty product id>/notes```

*Example request*

```POST '/beauty_products/414/notes'```

*Required parameters*

```
Headers:  "Content-Type": "application/json"

Body: 
{
  "note": <String>,
  "beauty_product_id" : <Number>
}
```

*Example response*

```
[
    {
        "note": "I like the silver one",
        "beauty_product_id": 414,
        "created_at": "2019-08-18T06:18:36.193Z",
        "updated_at": "2019-08-18T06:18:36.193Z"
    }
]
```


#### PATCH a note:

```/beauty_products/notes/<note id>```

*Example request*

```PATCH '/beauty_products/notes/414'```

*Required parameters*

```
Headers:  "Content-Type": "application/json"

Body: 
{
  "id" : <Number>
  "note": <New String>,
}
```

*Example response*

```
[
    {
        "id": "414",
        "note": "I like the pink one",
    }
]
```



#### DELETE a beauty product:

```/beauty_products/<beauty product id>```

*Example request*

```DELETE '/beauty_products/414'```

*Example response*

```
{
    "success": "You have successfully deleted beauty product with the id of 414"
}


