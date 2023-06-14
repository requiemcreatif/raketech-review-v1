import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type Review = {
    brand_id: string,
    position: number,
    info: {
        rating: number,
        features: string[]
    },
    terms_and_conditions: string,
    logo: string,
    play_url: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Review[]>
) {
  // Fetch reviews from the api
  const response = await axios.get('http://localhost:8888/raketech/wp-content/plugins/data.json');
  const { toplists: { "575": reviews } } = response.data;
  reviews.sort((a: Review, b: Review) => a.position - b.position); // Order by position

  res.status(200).json(reviews);
}