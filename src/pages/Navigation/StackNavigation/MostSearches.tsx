import React, { useState } from 'react'
import styled from 'styled-components/native'
import { Pressable, ScrollView, View } from 'react-native'
import { COLORS } from '../../../styles/theme'
import SearchBar from '../../../components/SearchBar'
import SearchGrayIcon from '../../../assets/icons/SearchGrayIcon'
import CloseGrayIcon from '../../../assets/icons/CloseGrayIcon'
import ArrowUpRightIcon from '../../../assets/icons/ArrowUpRight'
import CloseIcon from '../../../assets/icons/Close'

const MostSearches: React.FC = () => {
  const [closedItems, setClosedItems] = useState<number[]>([])
  const [searchText, setSearchText] = useState<string>('')

  const handleClose = (index: number) => {
    setClosedItems([...closedItems, index])
  }

  const handleSearchTextChange = (text: string) => {
    setSearchText(text)
  }

  const handleClearSearch = () => {
    setSearchText('')
  }

  const data = [
    'Half hand t-shirts designs',
    'Sleeveless designs',
    'Tending styles',
    'Premium shirts',
    'Half hand t-shirts designs',
    'Sleeveless designs',
  ]

  return (
    <ScrollViewContainer>
      <SearchesWrapper>
        <SearchBar
          placeholder='Search'
          leftIcon={<SearchGrayIcon width={20} height={20} />}
          rightIcon={searchText ? <CloseGrayIcon width={20} height={20} /> : null}
          onChangeText={handleSearchTextChange}
          onClear={handleClearSearch}
          value={searchText}
        />
        <MostSearchesHead>Most searches</MostSearchesHead>
        {data.map((item, index) => {
          const isItemClosed = closedItems.includes(index)

          return (
            <View key={index}>
              {!isItemClosed && (
                <MostSearchContent>
                  <SearchFlexContent>
                    <ArrowUpRightIcon width={14} height={14} />
                    <SearchText>{item}</SearchText>
                  </SearchFlexContent>
                  <Pressable onPress={() => handleClose(index)}>
                    <CloseIcon width={20} height={20} />
                  </Pressable>
                </MostSearchContent>
              )}
            </View>
          )
        })}
      </SearchesWrapper>
    </ScrollViewContainer>
  )
}

const SearchesWrapper = styled.View`
  padding: 24px;
`

const ScrollViewContainer = styled.ScrollView`
  background: ${COLORS.backgroundClr};
  height: 100%;
`

const MostSearchesHead = styled.Text`
  font-size: 12px;
  font-family: Gilroy-Regular;
  color: ${COLORS.textSecondaryClr};
  margin-top: 24px;
`

const MostSearchContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-vertical: 16px;
  padding-horizontal: 6px;
`

const SearchFlexContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const SearchText = styled.Text`
  color: ${COLORS.iconsHighlightClr};
  font-size: 14px;
  font-family: Gilroy-Medium;
`

export default MostSearches
