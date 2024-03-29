const apiKey = 'HkvKMtOCWvkamf1vyEGtuXnw5LTKUgjiXd0mOZhUXtT-7chBGx9Xu6CZkpy_hpXiVkc59lVb-JzmaOBjO7aabcbilVsc6tKN9MS4FrfTJz4Oeu9cy_7GuYZPlazlX3Yx'

const Yelp = {
    search(term, location, sortBy) {
        return fetch(
            `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
            {headers: {
                Authorization: `Bearer ${apiKey}`
            }}
        ).then(response => {
            if(response.ok) {
                return response.json()
            }
            throw new Error ('Request failed!')
        }, networkError => {
            console.log(networkError.message)
        }).then(jsonResponse => {
            if(jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => ({
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count
                }))
            }
        })
    }
}

export default Yelp;