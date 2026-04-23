package com.expensetracker.service;

import com.expensetracker.model.Expense;
import com.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    // Get all expenses
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    // Get expense by ID
    public Optional<Expense> getExpenseById(Long id) {
        return expenseRepository.findById(id);
    }

    // Get expenses by category
    public List<Expense> getExpensesByCategory(String category) {
        return expenseRepository.findByCategory(category);
    }

    // Get all categories
    public List<String> getAllCategories() {
        return expenseRepository.findDistinctCategories();
    }

    // Create a new expense
    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // Update an expense
    public Expense updateExpense(Long id, Expense expenseDetails) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));

        expense.setAmount(expenseDetails.getAmount());
        expense.setCategory(expenseDetails.getCategory());
        expense.setDescription(expenseDetails.getDescription());
        expense.setDate(expenseDetails.getDate());

        return expenseRepository.save(expense);
    }

    // Delete an expense
    public void deleteExpense(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));
        expenseRepository.delete(expense);
    }

    // Get category summary for analysis
    public List<java.util.Map<String, Object>> getCategorySummary() {
        List<Object[]> results = expenseRepository.getCategorySummary();
        List<java.util.Map<String, Object>> summary = new java.util.ArrayList<>();
        for (Object[] result : results) {
            java.util.Map<String, Object> map = new java.util.HashMap<>();
            map.put("category", result[0]);
            map.put("total", result[1]);
            summary.add(map);
        }
        return summary;
    }
}
