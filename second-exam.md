# Gyakorló feladatok a féléves vizsgára

- Jelenleg **vázlat** minőségben láthatjátok, idővel szépül,
  lefordítom magyarra, stb. Türelmet kérek, előre is köszönöm :)
- Érdemes átnézni az "expression and control flow" feladatait.

# Algoritmikus gyakorló feladatok

## __`s` karakterre végződik__

Készíts egy függvényt `countWordsEndsWithS` néven, ami
- bemenetként egy string-et kap, és
- visszatér az `s` karakterre végződő szavak számával.

Példa bemenet:

```java
countWordsEndsWithS("ends with s characters");
```

A várt visszatérési érték `3`, mert "end`s` with `s` character`s`".

## __Mátrix elemeinek szorzása__

Készíts egy függvényt `multiplyMatrixItems` néven, ami
- bemenetként egy egész számokat tartalmazó mátrixot (kétdimenziós tömb) kap, és
- minden, páratlan indexű sorban található páros számot megszoroz 2-vel, és
- visszatér a módosított mátrixszal.

Példa bemenet:
```
1 3 6 2
4 5 6 1
3 3 1 5
9 0 5 2
```

Példa eredmény:
```
1  3  6  2
8  5  12 1
3  3  1  5
9  0  5  4
```

## __Tömb összefésülés__

Készíts egy függvényt `mergeElements` néven, ami
- bemenetként 2 string-eket tartalmazó tömböt / listát kap, és
- összefésüli a két tömböt / listát eggyé, és
- visszatér az új tömbbel / listával.

Figyelj arra, hogy a tömböket / listákat nem összefűzni (concat) kell, hanem összefésülni (merge)!

Példa bemenet:
```java
mergeElements(["apple", "pear", "banana", "orange"], ["dog", "cat"]);
```

Példa eredmény:
```java
["apple", "dog", "pear", "cat", "banana", "orange"]
```

# OOP gyakorló feladatok

### Bankrendszer

Ebben a feladatban bankszámlát (`BankAccount`) fogsz készíteni, amin pénzt tudsz elhelyezni és amiről pénzt tudsz levenni.

#### Valuta (`Currency`)

- A valutát a pénznem kód (`code`), a központi bank neve (`central bank name`) és az érték (`value`) mezők jellemzik.

##### USA dollár (`USADollar`)

- Pozitív értéket fogad el.
- A kód alapértelmezetten *`USD`*.
- A központi bank neve alapértelmezetten *`Federal Reserve System`*.

##### Magyar forint (`HungarianForint`)

- Pozitív értéket fogad el.
- A kód alapértelmezetten *`HUF`*.
- A központi bank neve alapértelmezetten *`Hungarian National Bank`*.

#### Bankszámla (`BankAccount`)

- A bankszámlát a neve (`name`), a pin kódja (`pinCode`) és a valuta (`Currency` típusú) mezők jellemzik.

- Van befizet (`deposit`) metódusa, amelynek az egyetlen paramétere az összeg, és
    
    - ellenőrzi, hogy a paraméterként megadott érték pozitív-e,
    - majd hozzáadja a paraméter értékét a valuta érték mezőjéhez.

- Van felvesz (`withdraw`) metódusa, amelynek két paramétere van: a pin kód és az összeg, és

    - ellenőrzi, hogy a megadott pin kód helyes-e (egyenlő-e az eredeti pin kóddal),
    - és a valuta értéke nagyobb, mint a felvenni kívánt összeg
    
    - ha igen, akkor levonja az összeget a valuta értékéből,
    - és visszatér a felvenni kívánt összeggel
    
    - egyébként nem módosítja a valuta értékét,
    - és 0-val tér vissza

#### Bank

- A bankot a hozzá tartozó bankszámlák (`BankAccount`) listája jellemzi.

- Van számla létrehozás (`createAccount`) metódusa, amelynek az egyetlen paramétere a bankszámla (`BankAccount` típusú), és

    - hozzáadja a bankszámlát a listához
    
- Van tőke lekérdezés (`getAllMoney`) metódusa, amely

    - visszatér az összes bankszámlán található pénz összegével (függetlenül a valuta pénznemétől)

---

### Édességbolt (`CandyShop`)

Ebben a feladatban egy édességboltot (`CandyShop`) fogsz készíteni, ahol cukorkát és nyalókát készítesz, illetve árulsz.

#### Édesség (`Candy`)

- Az édességet az ára (`price`) és a benne található cukor (`sugar`) mennyisége jellemzi.
- 2 típusú édesség létezik: a nyalóka (`Lollipop`) és a cukorka (`HardCandy`).

##### Nyalóka (`Lollipop`)

- Az ára 600 Ft és 60 gramm cukorból készül.

##### Cukorka (`HardCandy`)

- Az ára 1200 Ft és 80 gramm cukorból készül.

#### Édességbolt (`CandyShop`)

- Az édességboltot a rendelkezésre álló cukor mennyisége (`sugar`), a bevétel (`income`) és a készlet (`inventory`, az édességek listája) jellemzi.
- Egy édességbolt példány létrehozásakor bemenetként a cukor mennyiségét (`amountOfSugar`) kell megadni.

- Van egy édességkészítés (`createCandy`) metódusa, amelynek az egyetlen paramétere bármelyik édesség (`Candy`) lehet, és

    - a cukor mennyisége (`sugar`) nem csökkenhet 0 alá,
    
    - ha a cukor mennyisége 0 alá csökkenne,
    - akkor dobjon hibát/kivételt beszédes üzenettel
    
    - egyébként adja hozzá az édességet a készlethez (`inventory`),
    - és csökkentse a rendelkezésre álló cukor mennyiségét az édességhez felhasznált cukor mennyiségével
    
- Van egy áremelés (`raisePrice`) metódusa, amelynek az egyetlen paramétere az áremelés összege, és

    - növelje meg a készletben található összes édesség árát a megadott összeggel
    
- Van egy eladás (`sell`) metódusa, amelynek az egyetlen paramétere az eladni kívánt édesség mennyisége, és

    - a bevételt megnöveli az eladott édességek árával, és
    - az eladott édességeket eltávolítja a készletből
    
    - ha több édességet kíván eladni, mint amennyi készleten van (ilyet nem lehet),
    - akkor legfeljebb annyit adjon el, amennyit lehetséges
    
- Van egy cukorvásárlás (`buySugar`) metódusa, amelynek az egyetlen paramétere a mennyiség, és

    - a paraméter értéke kilogrammban van megadva,
    - és 1000 gramm cukor ára 600 Ft
    
    - ha a bevétel 0 alá csökkenne,
    - akkor dobjon hibát/kivételt beszédes üzenettel
    
    - egyébként növelje meg a rendelkezésre álló cukor mennyiségét,
    - és csökkentse a bevételt a megvásárolt cukor árával
    
- Van egy szöveggé alakító (`toString`) metódusa, amely az édességboltot reprezentálja, és

    - visszatér egy string-gel a következő formátumban:
    
        - `Készlet: 0 cukorka, 1 nyalóka; Bevétel: 30000 Ft; Cukor: 400 gramm`

---

### Forest simulator

You are going to model a Forest with rain and a lumberjack who cuts tall trees.

#### Tree

- Trees should have a height.

- We should be able to create trees in two ways:

  - providing `height`
  - not providing `height`, in this case the height will be 0 by default.

- It has an `irrigate` method which will increase the height of the tree.
  The implementation should depend on the type of the tree.

- It has a `getHeight` method which returns the tree's height.

##### WhitebarkPine

- This tree type grows by 2 units each time its irrigated.

##### FoxtailPine

- This tree type grows by 1 unit each time its irrigated.

#### Lumberjack

You should be able to create a lumberjack without providing any parameters.

- It has a `canCut(tree)` method which takes a tree as parameter and
  returns true if its taller than 4 units.

#### Forest

- It should have a list of trees.

- We should be able to create a forest by receiving a list of trees.

- It has a `rain` which should iterate through the trees and irrigate
  them one by one.

- It has a `cutTrees(lumberjack)` which should remove all the trees which can be
  cut by the lumberjack. (It calls the `canCut` method on the lumberjack).

- It has an `isEmpty` method which returns true
  if there is no tree in the forest.

- It has a `getStatus` method which returns an array/list
  with status reports about each tree in the forest.
  For example:

```text
[
  'There is a 3 tall WhitebarkPine in the forest.',
  'There is a 2 tall WhitebarkPine in the forest.',
  'There is a 4 tall FoxtailPine in the forest.'
]
```
