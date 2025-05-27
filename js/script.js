// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Created on: Sep 2020
// This file contains the JS functions for index.html
const sauces = [
    { name: "Marinara", price: 2.00 },
    { name: "Ragù Bolognese", price: 2.00 },
    { name: "Crushed tomatoes, tomato sauce, and tomato paste", price: 2.00 },
    { name: "Pomodoro", price: 2.00 },
    { name: "Arrabbiata", price: 2.00 },
    { name: "Sugo di Pomodoro con Verdure", price: 2.00 },
    { name: "Puttanesca Sauce", price: 2.00 },
    { name: "Béchamel", price: 2.00 },
    { name: "Alfredo", price: 2.00 },
    { name: "Cream Cheese", price: 2.00 },
    { name: "Pesto", price: 2.00 },
    { name: "Pesto alla Trapanese (Sicilian Pesto)", price: 2.00 }
  ];
  
  const cheeses = [
    { name: "Parmesan", price: 2.00 },
    { name: "Mozzarella", price: 3.50 },
    { name: "Fontina", price: 3.50 },
    { name: "Pecorino Romano", price: 3.50 },
    { name: "Greek Yogurt", price: 3.50 },
    { name: "Ricotta Cheese", price: 3.50 },
    { name: "Mascarpone Cheese", price: 3.50 },
    { name: "Romano Cheese", price: 3.50 }
  ];
  
  const meats = [
    { name: "Ground Beef", price: 4.00 },
    { name: "Chicken", price: 4.00 },
    { name: "Sausage", price: 4.00 },
    { name: "Ground Pork", price: 4.00 },
    { name: "Ground Lamb", price: 4.00 },
    { name: "Ground Turkey", price: 4.00 },
    { name: "Seafood (Shrimp, Crab, and/or Lobster)", price: 4.00 }
  ];
  
  const vegetables = [
    { name: "Garlic", price: 0.15 },
    { name: "Carrots", price: 0.75 },
    { name: "Onions", price: 0.75 },
    { name: "Peas", price: 1.00 },
    { name: "Scallions or Green Onions", price: 1.00 },
    { name: "Shallots", price: 1.00 },
    { name: "Zucchini", price: 1.25 },
    { name: "Leeks", price: 1.50 },
    { name: "Kale", price: 1.50 },
    { name: "Swiss Chard", price: 1.50 },
    { name: "Arugula", price: 1.50 },
    { name: "Eggplant", price: 1.75 },
    { name: "Broccoli", price: 1.75 },
    { name: "Fennel", price: 1.75 },
    { name: "Peppers", price: 2.00 },
    { name: "Yukon Gold Potato", price: 2.00 },
    { name: "Roast Sweet Potato", price: 2.00 },
    { name: "Mushrooms", price: 2.00 },
    { name: "Bean Greens", price: 2.50 },
    { name: "Quorn Mince", price: 2.50 }
  ];
  
  // Dynamically populate options on page load
  function populateOptions() {
    const saucesDiv = document.getElementById("sauces");
    sauces.forEach((sauce, i) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="sauce" value="${i}"> ${sauce.name} - $${sauce.price.toFixed(2)}`;
      saucesDiv.appendChild(label);
    });
  
    const cheesesDiv = document.getElementById("cheeses");
    cheeses.forEach((cheese, i) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" name="cheese" value="${i}"> ${cheese.name} - $${cheese.price.toFixed(2)}`;
      cheesesDiv.appendChild(label);
    });
  
    const meatsDiv = document.getElementById("meats");
    meats.forEach((meat, i) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="meat" value="${i}"> ${meat.name} - $${meat.price.toFixed(2)}`;
      meatsDiv.appendChild(label);
    });
  
    const vegetablesDiv = document.getElementById("vegetables");
    vegetables.forEach((veg, i) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" name="vegetable" value="${i}"> ${veg.name} - $${veg.price.toFixed(2)}`;
      vegetablesDiv.appendChild(label);
    });
  }
  
  window.onload = populateOptions;
  
  function calculateTotal() {
    const totalsDiv = document.getElementById("totals");
    totalsDiv.innerHTML = ""; // Clear previous messages
  
    // Check size
    const sizeRadios = document.querySelectorAll('input[name="size"]:checked');
    if (sizeRadios.length === 0) {
      totalsDiv.innerHTML = `<div class="error">❌ Please select a size! 📏</div>`;
      return;
    }
    const sizePrice = parseFloat(sizeRadios[0].value);
  
    // Check sauce
    const sauceRadios = document.querySelectorAll('input[name="sauce"]:checked');
    if (sauceRadios.length === 0) {
      totalsDiv.innerHTML = `<div class="error">❌ Please select a sauce! 🍅</div>`;
      return;
    }
    const sauceIndex = parseInt(sauceRadios[0].value);
    const sauce = sauces[sauceIndex];
  
    // Check meat
    const meatRadios = document.querySelectorAll('input[name="meat"]:checked');
    if (meatRadios.length === 0) {
      totalsDiv.innerHTML = `<div class="error">❌ Please select a meat! 🍖</div>`;
      return;
    }
    const meatIndex = parseInt(meatRadios[0].value);
    const meat = meats[meatIndex];
  
    // Check cheeses (multiple choice)
    const cheeseCheckboxes = document.querySelectorAll('input[name="cheese"]:checked');
    if (cheeseCheckboxes.length === 0) {
      totalsDiv.innerHTML = `<div class="error">❌ Please select at least one cheese! 🧀</div>`;
      return;
    }
    if (cheeseCheckboxes.length > 3) {
      totalsDiv.innerHTML = `<div class="error">❌ Please select no more than 3 cheeses! 🧀🚫</div>`;
      return;
    }
    const selectedCheeses = Array.from(cheeseCheckboxes).map(cb => cheeses[parseInt(cb.value)]);
  
    // Vegetables (multiple choice, no limit)
    const vegetableCheckboxes = document.querySelectorAll('input[name="vegetable"]:checked');
    const selectedVegetables = Array.from(vegetableCheckboxes).map(cb => vegetables[parseInt(cb.value)]);
  
    // Calculate subtotal
    let subtotal = sizePrice + sauce.price + meat.price;
    selectedCheeses.forEach(c => subtotal += c.price);
    selectedVegetables.forEach(v => subtotal += v.price);
  
    // Calculate HST
    const hst = subtotal * 0.13;
  
    // Calculate total
    const total = subtotal + hst;
  
    // Build order summary
    let summary = `🎉 Your Delicious Lasagna Order 🎉\n\n`;
    summary += `📏 Size: $${sizePrice.toFixed(2)}\n`;
    summary += `🍅 Sauce: ${sauce.name} ($${sauce.price.toFixed(2)})\n`;
    summary += `🍖 Meat: ${meat.name} ($${meat.price.toFixed(2)})\n`;
  
    summary += `🧀 Cheeses (${selectedCheeses.length}):\n`;
    selectedCheeses.forEach(c => {
      summary += `   - ${c.name} ($${c.price.toFixed(2)})\n`;
    });
  
    if (selectedVegetables.length > 0) {
      summary += `🥦 Vegetables (${selectedVegetables.length}):\n`;
      selectedVegetables.forEach(v => {
        summary += `   - ${v.name} ($${v.price.toFixed(2)})\n`;
      });
    } else {
      summary += "🥦 Vegetables: None\n";
    }
  
    summary += `\n💵 Subtotal: $${subtotal.toFixed(2)}\n`;
    summary += `💸 HST (13%): $${hst.toFixed(2)}\n`;
    summary += `💰 Total Price: $${total.toFixed(2)}\n\n`;
    summary += `Thank you for your order! Your lasagna will be ready soon. `;
  
    totalsDiv.textContent = summary;
  }
  