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



