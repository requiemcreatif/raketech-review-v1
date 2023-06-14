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

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Review[] | ErrorResponse>
) {
  try {
    // Fetch reviews from the API
    const response = await axios.get(process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '');

    const reviews: Review[] = response.data.toplists['575'];

    // Sort the reviews by position
    reviews.sort((a: Review, b: Review) => a.position - b.position);

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}