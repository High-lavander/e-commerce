import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
interface ISwiperComponentProps {
  images?: string[];
  swiperStyles?: React.CSSProperties | undefined;
  swiperClass?: string;
  swiperSlideStyles?: React.CSSProperties | undefined;
  swiperSlideClass?: string;
  imageStyles?: React.CSSProperties | undefined;
  imageClass?: string;
}

export const SwiperModalComponent = (props: ISwiperComponentProps) => {
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
      style={props.swiperStyles}
      className={`${props.swiperClass}`}
    >
      {props.images &&
        props.images.map((image) => {
          return (
            <SwiperSlide key={image} style={props.swiperSlideStyles} className={`${props.swiperSlideClass}`}>
              <img src={image} style={props.imageStyles} className={`${props.imageClass}`} />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};
