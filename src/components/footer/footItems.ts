import facebookImg from '../../assets/images/facebook.webp';
import instagramImg from '../../assets/images/instagram.webp';
import linkedinImg from '../../assets/images/linkedin.webp';
import threadsImg from '../../assets/images/threads.webp';
import tiktokImg from '../../assets/images/tiktok.webp';
import whatsappImg from '../../assets/images/whatsapp.webp';
import youtubeImg from '../../assets/images/youtube.webp';

type FootItem = {
  imgSrc: string;
  altText: string;
  href: string;
};

export const footItems: FootItem[] = [
  {imgSrc: facebookImg, altText: 'Facebook', href: 'https://www.facebook.com/yayojuan'},
  {imgSrc: instagramImg, altText: 'Instagram', href: 'https://www.instagram.com/yayojuan'},
  {imgSrc: linkedinImg, altText: 'LinkedIn', href: 'https://www.linkedin.com/in/yayojuan'},
  {imgSrc: threadsImg, altText: 'Threads', href: 'https://www.threads.net/@yayojuan'},
  {imgSrc: tiktokImg, altText: 'TikTok', href: 'https://www.tiktok.com/@yayojuan'},
  {imgSrc: whatsappImg, altText: 'WhatsApp', href: 'https://wa.me/1234567890'},
  {imgSrc: youtubeImg, altText: 'YouTube', href: 'https://www.youtube.com/@yayojuan'}
];
