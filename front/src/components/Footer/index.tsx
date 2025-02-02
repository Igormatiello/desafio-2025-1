import React from 'react';
import { Flex, Box, Image, Text, Link } from '@chakra-ui/react';
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillFacebook, AiFillInstagram, AiOutlineCreditCard, AiOutlineBank } from 'react-icons/ai';
import { RiCustomerService2Fill, RiCustomerServiceFill } from 'react-icons/ri';
import logo from "@/assets/img/2.png";

const Footer: React.FC = () => {
    return (
        <Flex
            p={2}
            bg="#add8e6"
            color="black" 
            justifyContent="space-between"
            alignItems="center"
            position="relative"
            zIndex={10}
            width="100%"
            minHeight="150px"
            flexWrap="wrap"
            paddingY={6}
        >
            <Box flex="1" minWidth="200px" mr={4}>
                <Image src={logo} alt="Logo da Empresa" boxSize="100px" />
                <Flex mt={4} alignItems="center">
                    <FaPhone color="black" /> {}
                    <Text ml={2} fontSize="sm" color="black">(49) 99998-3513</Text> {}
                </Flex>
                <Flex mt={4} alignItems="center">
                    <FaMapMarkerAlt color="black" /> {}
                    <Text ml={2} fontSize="sm" color="black">Rua dos Duques, Pato Branco - PR</Text> {}
                </Flex>
                <Flex mt={4}>
                    <Link href="#" mr={2}>
                        <AiFillFacebook color="black" /> {}
                    </Link>
                    <Link href="#">
                        <AiFillInstagram color="black" /> {}
                    </Link>
                </Flex>
            </Box>
            <Box flex="1" minWidth="200px" mr={4}>
                <Text fontWeight="bold" fontSize="md" mb={2} color="black">Formas de Pagamento:</Text> {}
                <Flex flexDir="column">
                    <Flex alignItems="center" mb={2}>
                        <AiOutlineCreditCard color="black" /> {}
                        <Text ml={2} fontSize="sm" color="black">Cartão de Crédito</Text> {}
                    </Flex>
                    <Flex alignItems="center" mb={2}>
                        <AiOutlineCreditCard color="black" /> {}
                        <Text ml={2} fontSize="sm" color="black">Cartão de Débito</Text> {}
                    </Flex>
                    <Flex alignItems="center" mb={2}>
                        <AiOutlineBank color="black" /> {}
                        <Text ml={2} fontSize="sm" color="black">Boleto</Text> {}
                    </Flex>
                    <Flex alignItems="center">
                        <AiOutlineBank color="black" /> {}
                        <Text ml={2} fontSize="sm" color="black">PIX</Text> {}
                    </Flex>
                </Flex>
            </Box>
            <Box flex="1" minWidth="200px" mr={4}>
                <Text fontWeight="bold" fontSize="md" mb={2} color="black">Atendimento:</Text> {}
                <Flex flexDir="column">
                    <Flex alignItems="center" mb={2}>
                        <RiCustomerService2Fill color="black" /> {}
                        <Text ml={2} fontSize="sm" color="black">Suporte 24 horas</Text> {}
                    </Flex>
                    <Flex alignItems="center" mb={2}>
                        <RiCustomerServiceFill color="black" /> {}
                        <Text ml={2} fontSize="sm" color="black">Melhor plataforma do Brasil</Text> {}
                    </Flex>
                </Flex>
            </Box>
            <Box flex="1" minWidth="200px">
                <Text fontWeight="bold" fontSize="md" mb={2} color="black">Missão:</Text> {}
                <Text fontSize="sm" color="black">Proporcionar os melhores momentos de lazer.</Text> {}
            </Box>
        </Flex>
    );
};

export default Footer;
