import axios from 'axios'
import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'

//フロントサイド
const Detail = ({ detail }) => {
    console.log(detail)

    return (
        <Box
            sx={{
                height: { xs: 'auto', md: '70vh' },
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
            }}>
            <Box
                sx={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${detail.backdrop_path})`,
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}></Box>
            <Container sx={{ zIndex: 1 }}>
                <Grid
                    sx={{
                        color: 'white',
                        padding: '26px 20px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                    container
                    alignItems={'center'}>
                    <Grid
                        md={4}
                        item
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <img
                            width={'70%'}
                            src={`https://image.tmdb.org/t/p/original${detail.poster_path}`}
                            alt=""
                        />
                    </Grid>
                    <Grid md={8} item>
                        <Typography paragraph variant="h4">
                            {detail.title}
                        </Typography>
                        <Typography paragraph>{detail.overview}</Typography>
                        <Typography variant="h6">
                            公開日：{detail.release_date}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

//サーバーサイド（SSR）
export async function getServerSideProps(context) {
    const { media_type, media_id } = context.params

    try {
        const jpResponse = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`,
        )

        let combinedData = { ...jpResponse.data }

        if (!jpResponse.data.overview) {
            const enResponse = await axios.get(
                `https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
            )
            combinedData.overview = enResponse.data.overview
        }

        return { props: { detail: combinedData } }
    } catch {
        return { notFound: true }
    }
}

export default Detail
