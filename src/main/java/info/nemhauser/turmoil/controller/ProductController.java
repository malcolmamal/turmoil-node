package info.nemhauser.turmoil.controller;

import info.nemhauser.turmoil.controller.service.ProductService;
import info.nemhauser.turmoil.model.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
class ProductController {

	@Autowired
	ProductService productService;

	@RequestMapping("/product")
	public @ResponseBody
	Product getProduct(@RequestParam(value = "code") String productCode) {

		return productService.getProductByCode(productCode);
	}
}