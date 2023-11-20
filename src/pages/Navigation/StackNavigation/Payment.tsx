// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import RNUpiPayment from 'react-native-upi-payment'
// import PayUUPI from 'payu-upi-react'
// import CustomButton from '../../../components/Button'

// const Payment = () => {
//   const orderId = () => {
//     const S4 = () => {
//       return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
//     }

//     return S4() + '-' + S4() + '-' + S4() + '-' + S4()
//   }
//   console.log(orderId())
//   const paymentGateway = async () => {
//     try {
//       const response = await RNUpiPayment.initializePayment(
//         {
//           vpa: '7358247659@ibl', // UPI ID of the receiver
//           payeeName: 'suganya', // Name of the receiver
//           amount: '1.00', // Amount to be paid
//           transactionRef: orderId(), // Unique transaction reference ID
//           // transactionNote: 'Payment for goods', // Transaction note
//           // currency: 'INR', // Currency code (e.g., INR for Indian Rupees)
//         },
//         successCallback,
//         failureCallback,
//       )
//       // PayUUPI.multiply()

//       console.log('UPI Payment Response:', response)

//       // Handle the response accordingly (e.g., show success message, navigate to the next screen)
//     } catch (error) {
//       console.error('UPI Payment Error:', error)
//       // Handle the error (e.g., show an error message)
//     }
//   }
//   const successCallback = (data: any) => {
//     console.log(data)
//   }
//   const failureCallback = (data: any) => {
//     console.log(data)
//   }
//   return (
//     <View style={{ flex: 1 }}>
//       <Text>
//         <CustomButton text='Payment' onPress={paymentGateway} />.
//       </Text>
//     </View>
//   )
// }

// export default Payment

// const styles = StyleSheet.create({})

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Payment = () => {
  return (
    <View>
      <Text>Payment</Text>
    </View>
  )
}

export default Payment

const styles = StyleSheet.create({})
