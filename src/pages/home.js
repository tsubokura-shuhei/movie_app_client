import AppLayout from '@/components/Layouts/AppLayout'
import { CardActionArea, CardMedia, Typography } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const home = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`api/getPopularMovies`)
                setMovies(response.data.results)
                console.log(movies)
            } catch (err) {
                console.log(err)
            }
        }
        fetchMovies()
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    home
                </h2>
            }>
            <Head>
                <title>Laravel - home</title>
            </Head>

            <Swiper
                spaceBetween={30}
                slidesPerView={5}
                breakpoints={{
                    0: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    340: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}>
                {movies.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <Link href={`detail/movie/${movie.id}`}>
                            <CardActionArea>
                                <CardMedia
                                    component={'img'}
                                    sx={{ aspectRatio: '2/3' }}
                                    image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            </CardActionArea>
                        </Link>

                        <Typography>公開日：{movie.release_date}</Typography>
                    </SwiperSlide>
                ))}
            </Swiper>
        </AppLayout>
    )
}

export default home
