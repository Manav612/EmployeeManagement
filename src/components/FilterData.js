// Import necessary React Native components
import React, { useState } from 'react';
import { View, Text, Button, FlatList,TextInput } from 'react-native';

// Function to fetch filtered employees
const fetchFilteredEmployees = async (minHolidays, setFilteredEmployees) => {
  try {
    const response = await fetch('/filter-employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ minHolidays }),
    });

    const data = await response.json();
    setFilteredEmployees(data.filteredEmployees);
  } catch (error) {
    console.error('Error fetching filtered employees:', error);
  }
};

// Main component for filtered employees
const FilteredEmployees = () => {
  const [minHolidays, setMinHolidays] = useState(5);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // Fetch filtered employees on component mount
  React.useEffect(() => {
    fetchFilteredEmployees(minHolidays, setFilteredEmployees);
  }, [minHolidays]);

  return (
    <View>
      <Text>Employees with More than 5 Holidays</Text>
      <Text>Minimum Holidays: {minHolidays}</Text>

      {/* Display filtered employees data using FlatList */}
      <FlatList
        data={filteredEmployees}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <Text>Employee ID: {item._id}</Text>
            <Text>Total Holidays: {item.totalHolidays}</Text>
            {/* Display additional employee details based on your requirements */}
          </View>
        )}
      />

      {/* Input for minimum holidays */}
      <Text>Set Minimum Holidays:</Text>
      <TextInput
        value={minHolidays.toString()}
        onChangeText={(text) => setMinHolidays(parseInt(text) || 0)}
        keyboardType="numeric"
      />

      {/* Button to trigger filtering */}
      <Button
        title="Filter Employees"
        onPress={() => fetchFilteredEmployees(minHolidays, setFilteredEmployees)}
      />
    </View>
  );
};

export default FilteredEmployees;
