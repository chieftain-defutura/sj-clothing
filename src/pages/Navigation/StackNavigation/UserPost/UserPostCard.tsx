import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { IUserPost } from '../../../../constant/types'
import CustomButton from '../../../../components/Button'

interface IUserPostCard {
  data: IUserPost
  setPostId: React.Dispatch<React.SetStateAction<string>>
  setOpenPost: React.Dispatch<React.SetStateAction<boolean>>
}

const UserPostCard: React.FC<IUserPostCard> = ({ data, setPostId, setOpenPost }) => {
  const handleEdit = (id: string) => {
    try {
      setPostId(id)
      setOpenPost(true)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Image source={{ uri: data.productImage }} alt='' width={100} height={100} />
      <Text>{data.productName}</Text>
      <CustomButton
        text='Edit'
        onPress={() => {
          handleEdit(data.id)
        }}
      />
    </View>
  )
}

export default UserPostCard

const styles = StyleSheet.create({})
