import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Avatar from './Avatar'
import Navigator from './Navigator'
import SelectStyle from './SelectStyle'
import { MidLevelData } from '../../utils/PostCreationData'
import SelectSize from './SelectSize'
import SelectColor from './SlectColor'
import AddImage from './AddImage'
import AddText from './AddText'
import TShirt from './T-Shirt'
import SelectDesign from './SelectDesign'
import FinalView from './FinalView'
import { useNavigation } from '@react-navigation/native'
import { colors } from 'react-native-swiper-flatlist/src/themes'

const Designs = [
  {
    hashTag: 'bluebee',
    image:
      'data:image/png;base64,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',
  },
  {
    hashTag: 'bluebee',
    image:
      'data:image/jpeg;base64,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',
  },
  {
    hashTag: 'bluebee',
    image:
      'https://w7.pngwing.com/pngs/581/370/png-transparent-butterfly-pink-butterfly-background-pink-butterflies-cosmetics-heart-decorative-thumbnail.png',
  },
  {
    hashTag: 'doodle',
    image:
      'https://www.pngkey.com/png/detail/590-5906189_vector-doodle-skull-vector-black-and-white-download.png',
  },
  {
    hashTag: 'cat',
    image: 'https://i.pinimg.com/originals/7d/68/a6/7d68a6a8c3e505524574e0a2a5068114.jpg',
  },
  {
    hashTag: 'cat',
    image: 'https://i.pinimg.com/736x/ff/bf/86/ffbf86dfcc7652dcdf54c8c5e9e9b196.jpg',
  },
  {
    hashTag: 'cat',
    image:
      'https://img.freepik.com/premium-photo/photo-cat-illustration-with-outline-art_392592-2788.jpg?w=2000',
  },
  {
    hashTag: 'doodle',
    image: 'https://i.pinimg.com/474x/fd/97/d2/fd97d24cfc8de15d56bd69a3a7271320.jpg',
  },
  {
    hashTag: 'doodle',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAQbsn16ucaEJH_iKUYT65Yl54vSZ4ynx8ltMVNoDlhLZiRQoLqABZ-uLktoshKSNSiWc&usqp=CAU',
  },
  {
    hashTag: 'love',
    image: 'https://www.pinkvilla.com/images/2023-04/1681473003_shutterstock_572240722.jpg',
  },
  {
    hashTag: 'love',
    image: 'https://images.herzindagi.info/image/2023/Aug/love-quotes-for-couple.jpg',
  },
  {
    hashTag: 'love',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqQOCpOF2_xHEe6FYX0i5RnCa2Lt4uFVOXox6zsH16d9p9s7B72QHjxAcO-jsEJ61Sm_w&usqp=CAU',
  },
  {
    hashTag: 'love',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1XkxzXgyvMXy_ereFVIUx48WyQN77Heuh-7VvpSCG34eWK6qvsJxl5u6-EowfJEkL9JA&usqp=CAU',
  },
  {
    hashTag: 'love',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeVEawr-h7qfmE99GRXfkPUqoKf8f9vWbDBKUnerqHhzlkFjToRRI1Q1Rro7H5EpnJS8M&usqp=CAU',
  },
  {
    hashTag: 'dog',
    image: 'https://cdn.mos.cms.futurecdn.net/ASHH5bDmsp6wnK6mEfZdcU-1200-80.jpg',
  },
  {
    hashTag: 'dog',
    image:
      'https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-08/220805-border-collie-play-mn-1100-82d2f1.jpg',
  },
  {
    hashTag: 'dog',
    image: 'https://c.ndtvimg.com/2023-08/m64cl9mo_dog-unsplash_625x300_20_August_23.jpg',
  },
  {
    hashTag: 'dog',
    image:
      'https://www.thekennelclub.org.uk/media/3267/toy.jpg?mode=crop&width=800&height=600&rnd=132188804840000000',
  },
]

const TextDesigns = [
  {
    hashTag: 'life',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnwOP0EotvNUHh_nUKqjP6u1eBm0-D18fTQ72U-ycDYVTeDwZf9Jlwazy0ID-oJg9zrts&usqp=CAU',
  },
  {
    hashTag: 'life',
    image: 'https://i.pinimg.com/736x/8d/2f/48/8d2f48d5ee155968a1715dfab363011f.jpg',
  },
  {
    hashTag: 'life',
    image:
      'https://img.freepik.com/premium-vector/motivational-quotes-quotes-about-life-life-quotes_681002-461.jpg?w=2000',
  },
  {
    hashTag: 'life',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtLdYeST5ZBPeB7STel4bNRMNbLjGPni4askbjXYGnsxru_gE2oMWLA9o2qoETM2t-7yM&usqp=CAU',
  },
  {
    hashTag: 'life',
    image:
      'https://thesleepjourney.com/wp-content/uploads/2020/12/Inspiration-quotes-about-life-bansky-1.jpg',
  },
  {
    hashTag: 'friendship',
    image:
      'https://img.freepik.com/premium-vector/our-laughs-are-limitless-our-memories-are-countless-our-friendship-is-endless_961871-98.jpg?w=2000',
  },
  {
    hashTag: 'friendship',
    image:
      'https://t3.ftcdn.net/jpg/05/16/96/14/360_F_516961423_FsoEVAkfMvlryg3v07xDIEP9IKM81DgR.jpg',
  },
  {
    hashTag: 'friendship',
    image:
      'https://www.ourmindfullife.com/wp-content/uploads/2021/12/Short-friendship-quotes-5.jpg.webp',
  },

  {
    hashTag: 'friendship',
    image: 'https://i.pinimg.com/736x/3f/88/34/3f88341bb8f51488db9827d30ed320c4.jpg',
  },
  {
    hashTag: 'family',
    image:
      'https://img.freepik.com/premium-vector/inspirational-motivational-family-farmhouse-lettering-quotes-printable-poster-sign-etc_64264-508.jpg?w=2000',
  },
  {
    hashTag: 'family',
    image:
      'https://img.freepik.com/premium-vector/happy-family-quotes-t-shirt-design_620531-1780.jpg?w=2000',
  },
  {
    hashTag: 'family',
    image: 'https://statustown.com/wp-content/uploads/englishstatusimages/Family-Quotes-6098.jpg',
  },
  {
    hashTag: 'family',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH6Ju3it4qdzUZq__jeA8qCKoJz6StueXLEQ&usqp=CAU',
  },
  {
    hashTag: 'family',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX6NUdr3Dx94J7goTwr83VFdx6bDhhkilytw&usqp=CAU',
  },

  {
    hashTag: 'motivational',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS35RgyQIhAhw8C5KjAcVgvMLAL03w3C1Ckrw&usqp=CAU',
  },
  {
    hashTag: 'motivational',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRWZuzOG5BOiL40y_ixyV20spwtPJcUcT5KQ&usqp=CAU',
  },
  {
    hashTag: 'motivational',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsjJV6JPtuHnousVO26sC7f2OIT0LO09vHjQ&usqp=CAU',
  },
  {
    hashTag: 'motivational',
    image:
      'https://e0.pxfuel.com/wallpapers/382/304/desktop-wallpaper-meaningful-deep-feelings-life-background-i-phone-in-2020-motivational-quotes-for-life-inspirational-quotes-motivation-inspirational-quotes-entrepreneur-motivation-thumbnail.jpg',
  },
  {
    hashTag: 'study',
    image:
      'https://static.wixstatic.com/media/4d1982_6f07ec3ceda64da49ec4b5208604cfa9~mv2.png/v1/fill/w_490,h_492,al_c,lg_1,q_85,enc_auto/4d1982_6f07ec3ceda64da49ec4b5208604cfa9~mv2.png',
  },
  {
    hashTag: 'study',
    image:
      'https://ih1.redbubble.net/image.4853846489.0737/st,small,845x845-pad,1000x1000,f8f8f8.jpg',
  },
  {
    hashTag: 'study',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZRQUunitRR88QOpwpj5CAotJ7ek50PVtG2Q&usqp=CAU',
  },
  {
    hashTag: 'study',
    image:
      'https://elearningindustry.com/wp-content/uploads/2014/04/ed0b0c31c412f7d67bd39119503bb394.jpg',
  },
  {
    hashTag: 'study',
    image:
      'https://previews.123rf.com/images/trylyla/trylyla2004/trylyla200400004/144207395-never-stop-learning-inspirational-and-motivational-quotes-hand-brush-lettering-and-typography-design.jpg',
  },
]

const Data = [
  {
    title: 'Product',
    content: 'Black blazer',
  },

  {
    title: 'Material',
    content: '70% Wool, 30% Mohair',
  },
  {
    title: 'Lining',
    content: '100% Silk',
  },
  {
    title: 'Price',
    content: '450 INR',
  },
]

interface IMediumLevel {}
const MediumLevel: React.FC<IMediumLevel> = () => {
  const navigation = useNavigation()
  const [toggleAvatar, setToggleAvatar] = useState(false)
  const [isSteps, setSteps] = useState(1)
  const [isImageOrText, setImageOrText] = useState(false)
  //data
  const [data, setData] = useState(MidLevelData)
  //style
  const [isType, setType] = useState('shirt')
  const [isDropDown, setDropDown] = useState(false)
  const [isSelectedStyle, setSelectedStyle] = useState('Half sleeve')
  //size
  const [isSelectCountry, setSelectCountry] = useState('India')
  const [isSelectedSize, setSelectedSize] = useState('s')
  //color
  const [isSelectedColor, setSelectedColor] = useState('white')
  //image&text
  const [isOpenDesign, setOpenDesign] = useState(false)
  const [isHashtag, setHashtag] = useState('')
  const [isImage, setImage] = useState(0)
  const [isDone, setDone] = useState(false)
  //finalview
  const [quantity, setQuantity] = useState('')
  const [approved, setApproved] = useState(false)
  const handleIncreaseSteps = () => {
    setSteps(isSteps + 1)
    setDropDown(false)
    setOpenDesign(false)
    setDone(false)
    if (isSteps === 4) {
      setHashtag('')
    }
  }
  const handleDecreaseSteps = () => {
    if (isSteps !== 1) {
      setSteps(isSteps - 1)
      setDropDown(false)
      setOpenDesign(false)
      if (isSteps === 4) {
        setHashtag('')
      }
    }
  }

  console.log(isSelectedColor)
  return (
    <View style={styles.midiumlevelContainer}>
      {!toggleAvatar ? (
        <Avatar setToggleAvatar={setToggleAvatar} />
      ) : (
        <View
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Navigator
            steps={isSteps}
            isOpenDesign={isOpenDesign}
            isDone={isDone}
            setDone={setDone}
            setDropDown={setDropDown}
            setOpenDesign={setOpenDesign}
            setImageOrText={setImageOrText}
            handleDecreaseSteps={handleDecreaseSteps}
            handleIncreaseSteps={handleIncreaseSteps}
          />
          {isSteps === 1 && (
            <SelectStyle
              isDropDown={isDropDown}
              isSelectedStyle={isSelectedStyle}
              isType={isType}
              setDropDown={setDropDown}
              setSelectedStyle={setSelectedStyle}
              setType={setType}
              handleIncreaseSteps={handleIncreaseSteps}
            />
          )}
          {isSteps === 2 && (
            <SelectSize
              isDropDown={isDropDown}
              isSelectedSize={isSelectedSize}
              isSelectCountry={isSelectCountry}
              setSelectCountry={setSelectCountry}
              setDropDown={setDropDown}
              setSelectedSize={setSelectedSize}
              handleIncreaseSteps={handleIncreaseSteps}
            />
          )}
          {isSteps === 3 && (
            <SelectColor
              isDropDown={isDropDown}
              isSelectedColor={isSelectedColor}
              setDropDown={setDropDown}
              setSelectedColor={setSelectedColor}
              handleIncreaseSteps={handleIncreaseSteps}
            />
          )}
          {isSteps === 4 && !isImageOrText && (
            <AddImage
              isDropDown={isDropDown}
              setDropDown={setDropDown}
              setOpenDesign={setOpenDesign}
            />
          )}

          {isSteps === 4 && isImageOrText && (
            <AddText
              isDropDown={isDropDown}
              setDropDown={setDropDown}
              setOpenDesign={setOpenDesign}
            />
          )}
          <View>
            <ScrollView>
              <TShirt />
              {isSteps === 5 && (
                <FinalView
                  Data={Data}
                  navigation={navigation}
                  setQuantity={setQuantity}
                  approved={approved}
                  setApproved={setApproved}
                  quantity={quantity}
                />
              )}
            </ScrollView>
          </View>
          {isOpenDesign && !isDone && isSteps === 4 && (
            <SelectDesign
              designs={isImageOrText ? TextDesigns : Designs}
              setOpenDesign={setOpenDesign}
              setHashtag={setHashtag}
              isHashtag={isHashtag}
              isImage={isImage}
              setImage={setImage}
              isDone={isDone}
              setDone={setDone}
            />
          )}
        </View>
      )}
    </View>
  )
}

export default MediumLevel

const styles = StyleSheet.create({
  midiumlevelContainer: {
    flex: 1,
    backgroundColor: '#FFEFFF',
  },
  submitBtn: {
    marginVertical: 8,
    fontFamily: 'Arvo-Regular',
    marginBottom: 54,
  },
})
