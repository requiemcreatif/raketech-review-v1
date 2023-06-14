// Reviews.tsx
import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ReviewCard from '../components/ReviewCard';
import Modal from '../components/Modal';



interface Review {
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

const Reviews: FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [displayReviews, setDisplayReviews] = useState<Review[]>([]);
    const [loadMoreCount, setLoadMoreCount] = useState(Number(Cookies.get('loadMoreCount')) || 1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchReviews = async (): Promise<void> => {
            try {
                const response = await axios.get<Review[]>('/api/reviews');
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    useEffect(() => {
        const updateDisplayReviews = (): void => {
            setDisplayReviews(reviews.slice(0, 3 * loadMoreCount));
        };

        const saveLoadMoreCountToCookie = (): void => {
            Cookies.set('loadMoreCount', loadMoreCount.toString(), { sameSite: 'lax' });
        };

        updateDisplayReviews();
        saveLoadMoreCountToCookie();
    }, [reviews, loadMoreCount]);

    const handleLoadMore = (): void => {
        if (displayReviews.length >= reviews.length) {
            setIsModalOpen(true);
        } else {
            setLoadMoreCount(prevCount => prevCount + 1);
        }
    };

    const handleLoadLess = (): void => {
        if (loadMoreCount > 1) {
            setLoadMoreCount(prevCount => prevCount - 1);
        }
    };

    return (
        <div className=' p-7 max-w-6xl mx-auto'>
            <div>
            {displayReviews.map(review => (
                <ReviewCard key={review.brand_id} review={review} />
            ))}
            <div className='flex gap-5 justify-center items-center mt-10 mb-10'>
                <button 
                    onClick={handleLoadMore} 
                    className="px-4 py-2 text-white bg-green-700 rounded hover:bg-blue-600 shadow-lg"
                >
                    Load More
                </button>
                <button 
                    onClick={handleLoadLess} 
                    className="px-4 py-2 text-white bg-red-700 rounded hover:bg-red-600 shadow-lg"
                >
                    Load Less
                </button>
            </div>
            <Modal show={isModalOpen} handleClose={() => setIsModalOpen(false)}>
                <h2 className="text-2xl font-bold mb-4">All brands have been loaded.</h2>
            </Modal>
            </div>
        </div>

    );
}

export default Reviews;