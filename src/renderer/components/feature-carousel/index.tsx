import type { MouseEvent } from 'react';
import { useState } from 'react';

import { useTranslation } from 'react-i18next';


import { Album, LibraryItem } from '/@/renderer/api/types';
import { usePlayQueueAdd } from '/@/renderer/features/player/hooks/use-playqueue-add';


interface FeatureCarouselProps {
    data: Album[] | undefined;
}

export const FeatureCarousel = ({ data }: FeatureCarouselProps) => {
    const { t } = useTranslation();
    const handlePlayQueueAdd = usePlayQueueAdd();
    const [itemIndex, setItemIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const currentItem = data?.[itemIndex];

    const handleNext = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDirection(1);
        if (itemIndex === (data?.length || 0) - 1 || 0) {
            setItemIndex(0);
            return;
        }

        setItemIndex((prev) => prev + 1);
    };

    const handlePrevious = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDirection(-1);
        if (itemIndex === 0) {
            setItemIndex((data?.length || 0) - 1);
            return;
        }

        setItemIndex((prev) => prev - 1);
    };

};
