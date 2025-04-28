'use client';
import Image from 'next/image';
import styles from './page.module.css';
import Checkbox from '@mui/material/Checkbox';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { Button, FormControlLabel } from '@mui/material';
import ky from 'ky';
import { useQuery } from 'react-query';

interface Cat {
    breeds: [];
    height: number;
    id: string;
    url: string;
    width: number;
}

export default function Home() {
    const [isAutorefresh, setIsAutorefresh] = useState(false);
    const [img, setImg] = useState('https://cdn2.thecatapi.com/images/e0f.jpg');

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const fetchCatData = async (): Promise<Cat[]> => {
        const res = await ky.get(`http://localhost:3000/api/getCat`);
        return (await res.json()) as Cat[];
    };
    const handleButttonClick = async () => {
        const data = await fetchCatData();
        setImg(data[0].url);
    };

    const { refetch } = useQuery({
        queryKey: ['data'],
        queryFn: handleButttonClick,
    });

    useEffect(() => {
        if (isAutorefresh) {
            const interval = setInterval(() => {
                refetch();
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [isAutorefresh]);

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.block}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                {...label}
                                checked={!isAutorefresh}
                                onChange={() => setIsAutorefresh(false)}
                                sx={{
                                    color: grey[800],
                                    '&.Mui-checked': {
                                        color: grey[600],
                                    },
                                }}
                            />
                        }
                        label="Enabled"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                {...label}
                                checked={isAutorefresh}
                                onChange={() => setIsAutorefresh(true)}
                                sx={{
                                    color: grey[800],
                                    '&.Mui-checked': {
                                        color: grey[600],
                                    },
                                }}
                            />
                        }
                        label="Autorefresh every 5 seconds"
                    />
                    <div className={styles.image}>
                        <Image src={img} alt="Кошка" width={100} height={100} />
                    </div>
                    <Button
                        variant="contained"
                        disabled={isAutorefresh}
                        onClick={handleButttonClick}
                    >
                        Get Cat
                    </Button>
                </div>
            </main>
            <footer className={styles.footer}>
                <div>
                    <p>Тестовое задание</p>
                    <p>Воскресенская Мария</p>
                    <p>email: vmm459@gmail.com</p>
                    <p>телеграмм: @vmm459</p>
                    <p>телефон: 89127889459</p>
                </div>
            </footer>
        </div>
    );
}
