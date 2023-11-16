import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, FONT_FAMILY, gradientOpacityColors } from '../../../styles/theme'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'

const TermsAndConditions = () => {
  const { t } = useTranslation('TermsAndConditions')
  return (
    <LinearGradient
      colors={gradientOpacityColors}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 25,
      }}
    >
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View>
          <CenterText>{t('TERMS & CONDITIONS')}</CenterText>
          <NormalText style={{ paddingBottom: 8 }}>{t('Welcome to')} SJ clothing.</NormalText>
          <NormalText>
            {t('PLEASE READ THESE TERMS OF USE CAREFULLY BEFORE USING THE CLOTHING APP.')}
          </NormalText>
          <HeadingText>{t('Acceptance of Terms')}</HeadingText>
          <NormalText>
            {t(
              'Acceptance of Terms By downloading, installing, or using SJ clothing , you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms,you should not use the app.',
            )}
          </NormalText>
          <HeadingText>{t('Account Registration')}</HeadingText>

          <NormalText>
            {t(
              'a. You must provide accurate and complete information when registering for an account on the Clothing App.',
            )}
          </NormalText>
          <NormalText>
            {t(
              'b. You are responsible for maintaining the confidentiality of your account information,including your username and password.',
            )}
          </NormalText>
          <NormalText>
            {t('c. You are responsible for all activities that occur under your account. ')}
          </NormalText>
          <NormalText>
            {t('d. You must notify us immediately of any unauthorized use of your account.')}
          </NormalText>
          <HeadingText>{t('Payment')}</HeadingText>
          <NormalText>
            {t(
              'a. When you place an order through the app, you agree to pay for the products or services ordered at the prices specified, including any applicable taxes and shipping  fees.',
            )}
          </NormalText>
          <NormalText>
            {t(
              'b. Payment information is securely processed, and we do not store your payment details.',
            )}
          </NormalText>
          <HeadingText>{t('Profile')}</HeadingText>
          <NormalText>
            {t(
              'a. You can create and manage your profile on the Clothing App, including personal information, preferences, and order history.',
            )}
          </NormalText>
          <NormalText>
            {t('b. Any information you provide in your profile must be accurate and up-to-date.')}
          </NormalText>
          <HeadingText>{t('Intellectual Property')}</HeadingText>
          <NormalText>
            {t(
              'a. All content and materials on the Clothing App, including but not limited to text, graphics, logos, and images, are the intellectual property of the company. You may not use, reproduce, or distribute these materials without our express written consent.',
            )}
          </NormalText>
          <HeadingText> {t('User Conduct')}</HeadingText>
          <NormalText>
            {t(
              'a. You agree not to engage in any unlawful, offensive, or harmful activities on the Clothing App.',
            )}
          </NormalText>
          <HeadingText>{t('Privacy')}</HeadingText>
          <NormalText>
            {t(
              'a. We collect and use your personal information in accordance with our Privacy Statement.',
            )}
          </NormalText>
          <HeadingText>{t('Termination')}</HeadingText>
          <NormalText>
            {t(
              'a. We may terminate or suspend your account and access to the app, with or without notice, for any reason, including violation of these Terms and Conditions.',
            )}
          </NormalText>
          <HeadingText> {t('Changes to Terms and Conditions ')}</HeadingText>
          <NormalText>
            {t(
              'a. We reserve the right to modify these Terms and Conditions at any time. It is your responsibility to review these terms regularly.Your continued use of the app after any  changes indicate your acceptance of the modified terms.',
            )}
          </NormalText>
          <HeadingText> {t('Contact Information')}</HeadingText>
          <NormalText>
            {t(
              'a. For questions or concerns regarding these Terms and Conditions, please contact us  using the contact information provided on the Clothing App. By using the Clothing App,  you acknowledge that you have read, understood, and agreed to these Terms and   Conditions. If you do not agree to these terms, please do not use the app. Your  continued use of the app indicates your acceptance of these terms and any updates or  revisions.',
            )}
          </NormalText>
          <HeadingText>{t('Information Collection')}</HeadingText>
          <NormalText> {t('We may collect the following sensitive information:')}</NormalText>
          <NormalText>
            {t(
              'a. Images: We may collect and store images that you choose to upload or share within the app.',
            )}
          </NormalText>
          <NormalText>
            {t(
              'b. Email Addresses: We may collect your email address to facilitate communication and account management.',
            )}
          </NormalText>
          <NormalText>
            {t(
              'c. Phone Numbers: We may collect your phone number for account verification and communication purposes.',
            )}
          </NormalText>
          <NormalText>
            {t(
              'd. Addresses: We may collect your physical address to provide location-based services or  for shipping purposes.',
            )}
          </NormalText>
          <NormalText>
            {t(
              'e. Location Data: We may collect and use your devices location data to enhance your experience within the Service, such as location-based features.',
            )}
          </NormalText>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default TermsAndConditions

const styles = StyleSheet.create({})

const CenterText = styled.Text`
  text-align: center;
  font-size: 16px;
  color: ${COLORS.textClr};
  font-family: ${FONT_FAMILY.GilroySemiBold};
  padding: 8px;
`
const HeadingText = styled.Text`
  color: ${COLORS.textClr};
  font-family: ${FONT_FAMILY.GilroySemiBold};
  padding: 8px 0;
`

const NormalText = styled.Text`
  color: ${COLORS.textRGBAClr};
  font-family: ${FONT_FAMILY.GilroyMedium};
`
