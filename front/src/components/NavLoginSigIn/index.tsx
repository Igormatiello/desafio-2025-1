import React from 'react';
import { Flex, Box, Heading, Text, Image } from '@chakra-ui/react';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "@/assets/img/2.png";

export const NavigationBar: React.FC = () => {
  return (
    <Flex p={4} align="center" justify="space-between" bg="#add8e6" color="white">
      <Box>
        <Link to="/" className="navbar-brand">
          <Image src={logo} alt="Logo da Empresa" boxSize="130px" />
        </Link>
      </Box>
      <Heading fontSize="2xl" fontFamily="cursive" mr="4">
        FishBone Store - O Mundo da Pesca
      </Heading>
      <Flex align="center">
        <Text fontSize="sm" mr="2">
          Ambiente 100% seguro
        </Text>
        <FaLock />
      </Flex>
    </Flex>
  );
};
