import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import styles from './SwiperImageComponent.module.scss';
interface ISwiperComponentProps {
  images?: string[];
  swiperClass?: string;
  swiperSlideClass?: string;
  swiperItemClass?: string;
  outerCb?: () => void;
}

export const SwiperImageComponent = (props: ISwiperComponentProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      className={`${styles.swiper} ${props.swiperClass}`}
    >
      {props.images &&
        props.images.map((image) => {
          return (
            <SwiperSlide key={image} className={`${styles.swiper__slide} ${props.swiperSlideClass}`}>
              <img
                src={image}
                className={`${styles.swiper__image} ${props.swiperItemClass}`}
                onClick={props?.outerCb}
              />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};
