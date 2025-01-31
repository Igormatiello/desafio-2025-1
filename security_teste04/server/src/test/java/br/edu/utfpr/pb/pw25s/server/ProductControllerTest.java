package br.edu.utfpr.pb.pw25s.server;

import org.springframework.http.ResponseEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class ProductControllerTest {
    private final String API_PRODUCTS = "/products";

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private ProductRepository productRepository;


    @Autowired
    private CategoryRepository categoryRepository;


    @BeforeEach
    public void cleanup() {
        productRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    @DisplayName("Get all products returns OK when products exist")
    public void getAllProducts_returnsOkWhenProductsExist() {
        Category category = new Category("exemplo");
        categoryRepository.save(category);
        productRepository.saveAll(Arrays.asList(
                new Product("Product 1", "descricao", BigDecimal.TEN, category, "url"),
                new Product("Product 2", "descricao 2", BigDecimal.TEN, category, "url")
        ));

        ResponseEntity<Object[]> response = testRestTemplate.getForEntity(API_PRODUCTS, Object[].class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().length).isEqualTo(2);
    }

    @Test
    @DisplayName("Get product by ID returns OK when product exists")
    public void getProductById_returnsOkWhenProductExists() {

        Category category = new Category("exemplo");
        categoryRepository.save(category);

        Product savedProduct = productRepository.save(new Product("Product 1", "descricao", BigDecimal.TEN, category, "url"));
        ResponseEntity<Product> response = testRestTemplate.getForEntity(API_PRODUCTS + "/" + savedProduct.getId(), Product.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getId()).isEqualTo(savedProduct.getId());
    }

    @Test
    @DisplayName("Get product by ID returns No Content when product does not exist")
    public void getProductById_returnsNoContentWhenProductDoesNotExist() {
        ResponseEntity<Object> response = testRestTemplate.getForEntity(API_PRODUCTS + "/999", Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }

    @Test
    @DisplayName("Get products by category returns OK when products exist")
    public void getProductsByCategory_returnsOkWhenProductsExist() {

        Category category = new Category("exemplo");
        categoryRepository.save(category);
        Product savedProduct1 = productRepository.save(new Product("Product 1", "descricao", BigDecimal.TEN, category, "url"));
        Product savedProduct2 = productRepository.save(new Product("Product 1", "descricao", BigDecimal.TEN, category, "url"));
        Long categoryId = category.getId();
        ResponseEntity<Object[]> response = testRestTemplate.getForEntity(API_PRODUCTS + "/" + categoryId + "/category", Object[].class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().length).isEqualTo(2);
    }

    @Test
    @DisplayName("Get products by category returns No Content when no products exist")
    public void getProductsByCategory_returnsNoContentWhenNoProductsExist() {

        Long categoryId = 1L;
        ResponseEntity<Object> response = testRestTemplate.getForEntity(API_PRODUCTS + "/" + categoryId + "/category", Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }


}
