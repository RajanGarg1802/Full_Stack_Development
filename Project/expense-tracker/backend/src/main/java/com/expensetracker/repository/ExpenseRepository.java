package com.expensetracker.repository;

import com.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // Find expenses by category
    List<Expense> findByCategory(String category);

    // Find all distinct categories
    @org.springframework.data.jpa.repository.Query("SELECT DISTINCT e.category FROM Expense e")
    List<String> findDistinctCategories();

    // Get total amount per category
    @org.springframework.data.jpa.repository.Query("SELECT e.category, SUM(e.amount) FROM Expense e GROUP BY e.category")
    List<Object[]> getCategorySummary();
}
