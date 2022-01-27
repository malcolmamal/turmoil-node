package info.nemhauser.turmoil.controller.service;

import info.nemhauser.turmoil.model.Product;

import org.springframework.stereotype.Service;

@Service("productService")
public class ProductService {

	public Product getProductByCode(final String productCode){

		Product product = new Product();
		product.setCode(productCode);
		product.setName("Super Product");
		product.setDescription("We build this product during our REST service course");
		product.setPrice(100.00);

		return product;
	}
}