describe('Тестирование перетаскивания ингредиентов в конструкторе', () => {
    before(() => cy.visit('http://localhost:3000'));

    it('Открытие страницы конструктора по умолчанию', () => {
        cy.contains('Соберите бургер');
    });

    it('Перетаскивание ингредиентов в конструктор', () => {
        cy.get('[class^=styles_constructorRow]').first().as('droppableArea');

        cy.get('div').contains('Флюоресцентная булка R2-D3').trigger('dragstart');
        cy.get('@droppableArea').trigger('drop');

        cy.get('div').contains('Соус традиционный галактический').trigger('dragstart');
        cy.get('@droppableArea').trigger('drop');

        cy.get('div').contains('Соус с шипами Антарианского плоскоходца').trigger('dragstart');
        cy.get('@droppableArea').trigger('drop');

        cy.get('div').contains('Хрустящие минеральные кольца').trigger('dragstart');
        cy.get('@droppableArea').trigger('drop');

        cy.get('div').contains('Мини-салат Экзо-Плантаго').trigger('dragstart');
        cy.get('@droppableArea').trigger('drop');

        cy.get('div').contains('Говяжий метеорит (отбивная)').trigger('dragstart');
        cy.get('@droppableArea').trigger('drop');
    });
});
