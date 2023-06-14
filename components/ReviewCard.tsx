import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import react icons
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsStarFill, BsStar } from 'react-icons/bs';

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

type ReviewCardProps = {
    review: Review
}

// This function extracts the url from the terms and conditions html
// to refactor : "terms_and_conditions": "21+ | <a href=\"https://generator.lorem-ipsum.info/terms-and-conditions\">T&CS Apply</a> | Gamble Responsibly",
// to : "https://generator.lorem-ipsum.info/terms-and-conditions"

function extractUrl(html: string): string {
    const regex = /href="([^"]*)"/;
    const match = html.match(regex);
    return match ? match[1] : '';
}

const Star: FC<{ filled: boolean }> = ({ filled }) => {
    return filled ? <BsStarFill className="text-yellow-500" /> : <BsStar />;
};

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
    if (!review) {
        return <p>No review data available.</p>
    }

    const termsUrl = extractUrl(review.terms_and_conditions);

    return (
        <>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 mb-4 gap-5 shadow-[0px_0px_1px_1px_#CBD5E0] rounded-xl p-2 bg-white">
                <div className="flex  items-center">
                    {review.logo && <Image className=" pt-1 w-full h-full rounded-xl md:w-1/2  mb-2" width={195} height={75} src={review.logo} alt="Brand logo" />}
                </div>
                <div className="text-sm flex gap-1 items-center">
                    {Array.from({ length: 5 }, (_, index) => (
                        <Star key={index} filled={index < review.info.rating} />
                    ))}
                </div>
                <div className="w-full ">
                    <ul>
                        {review.info.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                                <AiFillCheckCircle className="text-green-700 mr-2" /> {feature} {/* Green Check Icon */}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className=" flex flex-col lg:items-center">
                    <Link href={review.play_url}><button className="px-4 py-2 bg-green-700 text-white rounded shadow-lg">Play Now</button></Link>
                    {termsUrl && <Link href={termsUrl}><p className="text-sm text-black-500  underline mt-2 inline-block px-4">T&C Apply</p></Link>}
                </div>
            </div>
        </>
    )
}

export default ReviewCard;
