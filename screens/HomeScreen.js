import React, { useMemo, useState } from "react";
import { View } from "react-native";
import ExploreHeader from "../components/ExploreHeader";
import Listings from "../components/Listings";
import listingsData from "../data/airbnb-listings.json";

const Page = () => {
  const items = useMemo(() => listingsData, []);
  const [category, setCategory] = useState('Tiny homes');
  const onDataChanged = (category) => {
    setCategory(category);
  };
  return (
    <View style={{ flex: 1}}>
      <ExploreHeader />
      <Listings listings={items} category={category} refresh={0} />
    </View>
  );
};
export default Page;