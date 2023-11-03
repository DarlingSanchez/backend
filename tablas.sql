-- Crear la tabla Roles
CREATE TABLE Roles (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NombreDelRol VARCHAR(50)
);

-- Crear la tabla Usuarios
CREATE TABLE Usuarios (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100),
    Email VARCHAR(100),
    Password VARCHAR(200),
    Rol_ID INT,
    CONSTRAINT FK_UsuariosRoles FOREIGN KEY (Rol_ID) REFERENCES Roles(ID)
);

-- Crear la tabla Permisos
CREATE TABLE Permisos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    TodosPermisos VARCHAR(250)
);

-- Crear la tabla Roles_Permisos
CREATE TABLE Roles_Permisos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Rol_ID INT,
    Permiso_ID INT,
    CONSTRAINT FK_RolesPermisos_Roles FOREIGN KEY (Rol_ID) REFERENCES Roles(ID),
    CONSTRAINT FK_RolesPermisos_Permisos FOREIGN KEY (Permiso_ID) REFERENCES Permisos(ID)
);

-- Crear la tabla Proveedores
CREATE TABLE Proveedores (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NombreDelProveedor VARCHAR(150),
    NombreDelRepresentante VARCHAR(150),
    CorreoElectronico VARCHAR(100),
    Telefono VARCHAR(20)
);

-- Crear la tabla Productos
CREATE TABLE Productos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Codigo VARCHAR(50),
    NombreDelProducto VARCHAR(100),
    Descripcion TEXT,
    PrecioCompra DECIMAL(10, 2),
    PrecioVenta DECIMAL(10, 2),
    Ganancia DECIMAL(10, 2),
    Imagen VARCHAR(255)
);

-- Crear la tabla Historial_Precios
CREATE TABLE Historial_Precios (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Codigo VARCHAR(50),
    FechaCambioPrecio DATE,
    PrecioCompra DECIMAL(10, 2),
    PrecioVenta DECIMAL(10, 2),
    Ganancia DECIMAL(10, 2)
);

-- Crear la tabla Ventas
CREATE TABLE Ventas (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    FechaVenta DATE,
    Usuario_ID INT,
    SubTotal DECIMAL(10, 2),
    ISV DECIMAL(10, 2),
    Total DECIMAL(10, 2),
    TipoDePago VARCHAR(50),
    CONSTRAINT FK_Ventas_Usuarios FOREIGN KEY (Usuario_ID) REFERENCES Usuarios(ID)
);

-- Crear la tabla Detalle_Ventas
CREATE TABLE Detalle_Ventas (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Venta_ID INT,
    Producto_ID INT,
    CantidadVendida INT,
    Precio DECIMAL(10, 2), -- Precio unitario del producto
    ISV DECIMAL(10, 2),   -- Impuesto sobre el valor añadido para ese producto
    Total DECIMAL(10, 2),  -- Total para ese producto en la venta    
    CONSTRAINT FK_DetalleVentas_Ventas FOREIGN KEY (Venta_ID) REFERENCES Ventas(ID),
    CONSTRAINT FK_DetalleVentas_Productos FOREIGN KEY (Producto_ID) REFERENCES Productos(ID)
);

-- Crear la tabla Compras
CREATE TABLE Compras (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    FechaCompra DATE,
    Usuario_ID INT,
    SubTotal DECIMAL(10, 2),
    ISV DECIMAL(10, 2),
    Total DECIMAL(10, 2),
    CONSTRAINT FK_Compras_Usuarios FOREIGN KEY (Usuario_ID) REFERENCES Usuarios(ID)
);

-- Crear la tabla Detalle_Compras
CREATE TABLE Detalle_Compras (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Compra_ID INT,
    Producto_ID INT,
    CantidadComprada INT,
    Precio DECIMAL(10, 2), -- Precio unitario del producto
    ISV DECIMAL(10, 2),   -- Impuesto sobre el valor añadido para ese producto
    Total DECIMAL(10, 2),  -- Total para ese producto en la compra  
    CONSTRAINT FK_DetalleCompras_Compras FOREIGN KEY (Compra_ID) REFERENCES Compras(ID),
    CONSTRAINT FK_DetalleCompras_Productos FOREIGN KEY (Producto_ID) REFERENCES Productos(ID)
);

-- Crear la tabla Ordenes_Compra
CREATE TABLE Ordenes_Compra (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    FechaOrden DATE,
    Proveedor_ID INT,
    Producto_ID INT,
    CantidadSolicitada INT,
    CONSTRAINT FK_OrdenesCompra_Proveedores FOREIGN KEY (Proveedor_ID) REFERENCES Proveedores(ID),
    CONSTRAINT FK_OrdenesCompra_Productos FOREIGN KEY (Producto_ID) REFERENCES Productos(ID)
);


-- Agregar una restricción de campo único al campo "Codigo" de la tabla "Productos"
ALTER TABLE Productos
ADD CONSTRAINT UQ_Productos_Codigo UNIQUE (Codigo);

-- Agregar una restricción de campo único al campo "CorreoElectronico" de la tabla "Usuarios"
ALTER TABLE Usuarios
ADD CONSTRAINT UQ_Usuarios_CorreoElectronico UNIQUE (CorreoElectronico);

-- Crear la tabla Impuestos
CREATE TABLE Impuestos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NombreImpuesto VARCHAR(50),
    Porcentaje DECIMAL(5, 2)
);

-- Modificar la tabla Productos para agregar el campo Impuesto_ID después de PrecioCompra
ALTER TABLE Productos
ADD Impuesto_ID INT AFTER PrecioCompra,
ADD CONSTRAINT FK_Productos_Impuestos FOREIGN KEY (Impuesto_ID) REFERENCES Impuestos(ID);

--Agregar los tipos de impuestos
INSERT INTO Impuestos (NombreImpuesto, Porcentaje)
VALUES
('Venta Exenta', 0),
('Venta Exonerada', 0),
('Gravada 15%', 15),
('Gravada 18%', 18);

--agregar productos ficticios
INSERT INTO Productos (Codigo, NombreDelProducto,Categoria_ID, Descripcion, PrecioCompra, Impuesto_ID, PrecioVenta, Ganancia, Imagen) 
VALUES
('001', 'Perfume Floral', 1, 'Fragancia floral suave y duradera.', 20.00, 1, 30.00, 10.00, 'floral.jpg'),
('002', 'Colonia Cítrica',2, 'Colonia refrescante con notas cítricas.', 15.00, 2, 25.00, 10.00, 'citrica.jpg'),
('003', 'Aceite de Rosa',1, 'Aceite esencial de rosa para aromaterapia.', 12.50, 1, 20.00, 7.50, 'rosa.jpg'),
('004', 'Perfume de Vainilla',1, 'Fragancia cálida con toques de vainilla.', 18.00, 1, 28.00, 10.00, 'vainilla.jpg'),
('005', 'Loción Corporal de Lavanda',2, 'Loción relajante con aroma a lavanda.', 10.00, 2, 15.00, 5.00, 'lavanda.jpg'),
('006', 'Perfume Amaderado',3, 'Fragancia amaderada con matices de sándalo.', 25.00, 1, 35.00, 10.00, 'amaderado.jpg'),
('007', 'Aceite de Eucalipto',3, 'Aceite esencial de eucalipto para aromaterapia.', 8.00, 1, 15.00, 7.00, 'eucalipto.jpg'),
('008', 'Perfume de Rosas Rojas',1, 'Fragancia intensa con notas de rosas rojas.', 30.00, 2, 45.00, 15.00, 'rosas.jpg'),
('009', 'Perfume Fresco de Verano',2, 'Fragancia refrescante ideal para el verano.', 22.00, 1, 32.00, 10.00, 'verano.jpg'),
('010', 'Aceite de Bergamota',3, 'Aceite esencial de bergamota para aromaterapia.', 11.00, 2, 18.00, 7.00, 'bergamota.jpg');



-- Crear la tabla Categorias
CREATE TABLE Categorias (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NombreCategoria VARCHAR(100)
);

-- Modificar la tabla Productos para agregar el campo Categoria_ID después del campo NombreDelProducto
ALTER TABLE Productos
ADD Categoria_ID INT AFTER NombreDelProducto,
ADD CONSTRAINT FK_Productos_Categorias FOREIGN KEY (Categoria_ID) REFERENCES Categorias(ID);

-- Agregar tres categorías reales de Perfumería
INSERT INTO Categorias (NombreCategoria)
VALUES
('Fragancias Femeninas'),
('Fragancias Masculinas'),
('Cuidado de la Piel');


-- Crear la tabla Metodos_Pago
CREATE TABLE MetodosPago (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NombreMetodo VARCHAR(50)
);
-- Crear la tabla Detalle_Pagos
CREATE TABLE Detalle_Pagos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Venta_ID INT,
    MetodoPago_ID INT,
    MontoPago DECIMAL(10, 2),
    CONSTRAINT FK_DetallePagos_Ventas FOREIGN KEY (Venta_ID) REFERENCES Ventas(ID),
    CONSTRAINT FK_DetallePagos_MetodosPago FOREIGN KEY (MetodoPago_ID) REFERENCES MetodosPago(ID)
);

-- Crear la tabla Clientes
CREATE TABLE Clientes (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100),
    DNI_RTN VARCHAR(20),
    CorreoElectronico VARCHAR(100),
    Telefono VARCHAR(15)
);

-- Modificar la tabla Ventas para agregar el campo Cliente_ID
ALTER TABLE Ventas
ADD Cliente_ID INT AFTER Usuario_ID ,
ADD CONSTRAINT FK_Ventas_Clientes FOREIGN KEY (Cliente_ID) REFERENCES Clientes(ID);



-- Agregar campos de timestamps a la tabla Clientes
ALTER TABLE Clientes
ADD createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD updatedAt TIMESTAMP NULL DEFAULT NULL;

-- Agregar campos de timestamps a la tabla Compras
ALTER TABLE Compras
ADD createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD updatedAt TIMESTAMP NULL DEFAULT NULL;

-- Agregar campos de timestamps a la tabla Ventas
ALTER TABLE Ventas
ADD createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD updatedAt TIMESTAMP NULL DEFAULT NULL;

-- Agregar campos de timestamps a la tabla Productos
ALTER TABLE Productos
ADD createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD updatedAt TIMESTAMP NULL DEFAULT NULL;

-- Agregar campos de timestamps a la tabla Proveedores
ALTER TABLE Proveedores
ADD createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD updatedAt TIMESTAMP NULL DEFAULT NULL;

-- Agregar campos de timestamps a la tabla Usuarios
ALTER TABLE Usuarios
ADD createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD updatedAt TIMESTAMP NULL DEFAULT NULL;

-- Agregar campos de timestamps a la tabla Historial_Precios
ALTER TABLE Historial_Precios
ADD createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD updatedAt TIMESTAMP NULL DEFAULT NULL;
