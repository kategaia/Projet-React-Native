import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

export async function fetchItems() {
  const response = await fetch('http://100.96.207.56:8000/api/wines')
  console.log(response);
  
  return response.json()
}