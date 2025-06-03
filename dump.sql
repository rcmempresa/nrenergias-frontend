--
-- PostgreSQL database dump
--

-- Dumped from database version 15.10 (Homebrew)
-- Dumped by pg_dump version 15.10 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: order_status_enum; Type: TYPE; Schema: public; Owner: miranda
--

CREATE TYPE public.order_status_enum AS ENUM (
    'pendente',
    'processando',
    'enviado',
    'entregue',
    'cancelado'
);


ALTER TYPE public.order_status_enum OWNER TO miranda;

--
-- Name: payment_status_enum; Type: TYPE; Schema: public; Owner: miranda
--

CREATE TYPE public.payment_status_enum AS ENUM (
    'pendente',
    'pago',
    'falhado',
    'reembolsado'
);


ALTER TYPE public.payment_status_enum OWNER TO miranda;

--
-- Name: shipping_status_enum; Type: TYPE; Schema: public; Owner: miranda
--

CREATE TYPE public.shipping_status_enum AS ENUM (
    'pendente',
    'enviado',
    'entregue'
);


ALTER TYPE public.shipping_status_enum OWNER TO miranda;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: miranda
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    cart_id uuid NOT NULL,
    product_id integer NOT NULL,
    quantidade integer NOT NULL,
    preco_unitario numeric NOT NULL,
    preco_total numeric NOT NULL
);


ALTER TABLE public.cart_items OWNER TO miranda;

--
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: miranda
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cart_items_id_seq OWNER TO miranda;

--
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: miranda
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- Name: carts; Type: TABLE; Schema: public; Owner: miranda
--

CREATE TABLE public.carts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    cart_id uuid DEFAULT gen_random_uuid() NOT NULL,
    status character varying(50) DEFAULT 'ativo'::character varying NOT NULL,
    data_criacao timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.carts OWNER TO miranda;

--
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: miranda
--

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carts_id_seq OWNER TO miranda;

--
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: miranda
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- Name: favorites; Type: TABLE; Schema: public; Owner: miranda
--

CREATE TABLE public.favorites (
    id integer NOT NULL,
    user_id integer NOT NULL,
    produto_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.favorites OWNER TO miranda;

--
-- Name: favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: miranda
--

CREATE SEQUENCE public.favorites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorites_id_seq OWNER TO miranda;

--
-- Name: favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: miranda
--

ALTER SEQUENCE public.favorites_id_seq OWNED BY public.favorites.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: miranda
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    total numeric(10,2) NOT NULL
);


ALTER TABLE public.order_items OWNER TO miranda;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: miranda
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_items_id_seq OWNER TO miranda;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: miranda
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: miranda
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer,
    total_amount numeric(10,2),
    payment_status public.payment_status_enum NOT NULL,
    order_status public.order_status_enum NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.orders OWNER TO miranda;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: miranda
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO miranda;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: miranda
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: miranda
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    order_id integer NOT NULL,
    payment_method character varying(255) NOT NULL,
    transaction_id character varying(255) NOT NULL,
    status public.payment_status_enum NOT NULL,
    amount numeric(10,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.payments OWNER TO miranda;

--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: miranda
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payments_id_seq OWNER TO miranda;

--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: miranda
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- Name: product_images; Type: TABLE; Schema: public; Owner: miranda
--

CREATE TABLE public.product_images (
    id integer NOT NULL,
    product_id integer,
    url text NOT NULL
);


ALTER TABLE public.product_images OWNER TO miranda;

--
-- Name: product_images_id_seq; Type: SEQUENCE; Schema: public; Owner: miranda
--

CREATE SEQUENCE public.product_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_images_id_seq OWNER TO miranda;

--
-- Name: product_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: miranda
--

ALTER SEQUENCE public.product_images_id_seq OWNED BY public.product_images.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: miranda
--

CREATE TABLE public.products (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    descricao text,
    preco numeric(10,2) NOT NULL,
    estoque integer NOT NULL,
    marca character varying(100),
    categoria character varying(100),
    imagem_url text,
    data_criacao timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(50) DEFAULT 'ativo'::character varying,
    imagens text[],
    rating numeric(2,1),
    descricao_completa text,
    avaliacoes jsonb DEFAULT '[]'::jsonb,
    old_price numeric,
    caracteristicas text[]
);


ALTER TABLE public.products OWNER TO miranda;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: miranda
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO miranda;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: miranda
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: shipping_details; Type: TABLE; Schema: public; Owner: miranda
--

CREATE TABLE public.shipping_details (
    id integer NOT NULL,
    order_id integer NOT NULL,
    full_name character varying(255) NOT NULL,
    address text NOT NULL,
    city character varying(255) NOT NULL,
    zip_code character varying(20) NOT NULL,
    country character varying(255) NOT NULL,
    phone character varying(20),
    tracking_number character varying(255),
    status public.shipping_status_enum NOT NULL
);


ALTER TABLE public.shipping_details OWNER TO miranda;

--
-- Name: shipping_details_id_seq; Type: SEQUENCE; Schema: public; Owner: miranda
--

CREATE SEQUENCE public.shipping_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shipping_details_id_seq OWNER TO miranda;

--
-- Name: shipping_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: miranda
--

ALTER SEQUENCE public.shipping_details_id_seq OWNED BY public.shipping_details.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: miranda
--

CREATE TABLE public.users (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    senha character varying(255) NOT NULL,
    data_criacao timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(50) DEFAULT 'ativo'::character varying,
    endereco text,
    telefone character varying(20)
);


ALTER TABLE public.users OWNER TO miranda;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: miranda
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO miranda;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: miranda
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- Name: favorites id; Type: DEFAULT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.favorites ALTER COLUMN id SET DEFAULT nextval('public.favorites_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- Name: product_images id; Type: DEFAULT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.product_images ALTER COLUMN id SET DEFAULT nextval('public.product_images_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: shipping_details id; Type: DEFAULT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.shipping_details ALTER COLUMN id SET DEFAULT nextval('public.shipping_details_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: miranda
--

COPY public.cart_items (id, cart_id, product_id, quantidade, preco_unitario, preco_total) FROM stdin;
1	d0cfe155-5e2e-4755-9ecb-9223e074b082	101	5	29.99	149.95
50	d0cfe155-5e2e-4755-9ecb-9223e074b082	8	4	149.99	599.96
52	d0cfe155-5e2e-4755-9ecb-9223e074b082	10	1	100.00	100
39	d0cfe155-5e2e-4755-9ecb-9223e074b082	2	2	29.99	59.98
40	d0cfe155-5e2e-4755-9ecb-9223e074b082	4	1	49.99	49.99
89	9de70f97-43ff-4c69-a918-4c8921556efd	21	1	512.48	512.48
73	9de70f97-43ff-4c69-a918-4c8921556efd	7	1	299.99	299.99
74	9de70f97-43ff-4c69-a918-4c8921556efd	3	1	9.99	9.99
59	ec6cdbbd-8e90-4729-8b49-8ea2cd3f7186	8	1	149.99	149.99
51	d0cfe155-5e2e-4755-9ecb-9223e074b082	7	2	299.99	599.98
62	58421d78-1455-4952-b67c-5a9ea6de8455	10	1	100.00	100
63	58421d78-1455-4952-b67c-5a9ea6de8455	8	1	149.99	149.99
64	58421d78-1455-4952-b67c-5a9ea6de8455	4	3	49.99	149.97
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: miranda
--

COPY public.carts (id, user_id, cart_id, status, data_criacao) FROM stdin;
1	1	d0cfe155-5e2e-4755-9ecb-9223e074b082	aberto	2025-03-26 11:35:51.674766
6	2	9de70f97-43ff-4c69-a918-4c8921556efd	aberto	2025-03-26 20:54:00.800147
7	6	ec6cdbbd-8e90-4729-8b49-8ea2cd3f7186	aberto	2025-04-21 10:30:43.404473
8	8	58421d78-1455-4952-b67c-5a9ea6de8455	aberto	2025-04-30 14:16:44.21519
\.


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: miranda
--

COPY public.favorites (id, user_id, produto_id, created_at, updated_at) FROM stdin;
52	2	21	2025-05-15 10:46:48.446607	2025-05-15 10:46:48.446607
53	2	25	2025-05-23 13:58:47.170809	2025-05-23 13:58:47.170809
54	2	31	2025-05-24 09:23:29.286469	2025-05-24 09:23:29.286469
55	2	28	2025-06-02 09:01:59.179413	2025-06-02 09:01:59.179413
56	2	26	2025-06-02 09:02:38.063441	2025-06-02 09:02:38.063441
57	2	22	2025-06-02 11:57:15.528907	2025-06-02 11:57:15.528907
58	2	27	2025-06-02 11:58:29.351936	2025-06-02 11:58:29.351936
59	2	23	2025-06-02 11:58:57.314343	2025-06-02 11:58:57.314343
60	2	29	2025-06-02 12:04:30.437948	2025-06-02 12:04:30.437948
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: miranda
--

COPY public.order_items (id, order_id, product_id, quantity, price, total) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: miranda
--

COPY public.orders (id, user_id, total_amount, payment_status, order_status, created_at, updated_at) FROM stdin;
1	1	99.99	pendente	pendente	2025-04-05 10:50:36.149524	2025-04-05 10:50:36.149524
2	\N	\N	pendente	pendente	2025-04-05 11:01:53.349239	2025-04-05 11:01:53.349239
3	\N	\N	pendente	pendente	2025-04-05 11:03:21.669209	2025-04-05 11:03:21.669209
4	1	99.99	pendente	pendente	2025-04-05 11:05:21.477602	2025-04-05 11:05:21.477602
5	1	99.99	pendente	pendente	2025-04-05 11:06:21.014769	2025-04-05 11:06:21.014769
6	1	99.99	pendente	pendente	2025-04-05 11:07:01.404158	2025-04-05 11:07:01.404158
7	1	99.99	pendente	pendente	2025-04-05 11:09:54.435141	2025-04-05 11:09:54.435141
8	1	99.99	pendente	pendente	2025-04-05 11:14:11.545657	2025-04-05 11:14:11.545657
9	1	100.00	pendente	pendente	2025-04-05 11:14:43.959965	2025-04-05 11:14:43.959965
10	1	100.00	pendente	pendente	2025-04-05 11:15:48.677159	2025-04-05 11:15:48.677159
11	1	99.99	pendente	pendente	2025-04-05 11:17:44.857938	2025-04-05 11:17:44.857938
12	1	99.99	pendente	pendente	2025-04-05 11:18:39.236951	2025-04-05 11:18:39.236951
13	1	99.99	pendente	pendente	2025-04-05 11:18:48.757215	2025-04-05 11:18:48.757215
14	1	99.99	pendente	pendente	2025-04-05 11:18:59.771425	2025-04-05 11:18:59.771425
15	1	99.99	pendente	pendente	2025-04-05 11:20:05.486926	2025-04-05 11:20:05.486926
16	1	99.99	pendente	pendente	2025-04-05 11:20:46.221596	2025-04-05 11:20:46.221596
17	1	99.99	pendente	pendente	2025-04-05 11:22:35.794365	2025-04-05 11:22:35.794365
18	1	99.99	pendente	pendente	2025-04-05 11:24:14.724988	2025-04-05 11:24:14.724988
19	1	99.99	pendente	pendente	2025-04-05 11:25:06.850943	2025-04-05 11:25:06.850943
20	1	99.99	pendente	pendente	2025-04-05 11:25:17.923553	2025-04-05 11:25:17.923553
21	1	1259.92	pendente	pendente	2025-04-05 11:36:41.274867	2025-04-05 11:36:41.274867
22	1	99.99	pendente	pendente	2025-04-05 11:40:54.309412	2025-04-05 11:40:54.309412
23	1	99.99	pendente	pendente	2025-04-05 11:45:17.771331	2025-04-05 11:45:17.771331
24	1	99.99	pendente	pendente	2025-04-05 11:45:46.834909	2025-04-05 11:45:46.834909
25	1	99.99	pendente	pendente	2025-04-05 11:47:27.528153	2025-04-05 11:47:27.528153
26	1	109.97	pendente	pendente	2025-04-05 12:57:33.215916	2025-04-05 12:57:33.215916
27	2	739.94	pendente	pendente	2025-04-07 15:29:15.086341	2025-04-07 15:29:15.086341
28	2	1539.93	pendente	pendente	2025-04-09 10:42:58.552765	2025-04-09 10:42:58.552765
29	2	1039.95	pendente	pendente	2025-04-11 15:22:24.245803	2025-04-11 15:22:24.245803
30	1	1009.92	pendente	pendente	2025-04-11 15:30:05.434896	2025-04-11 15:30:05.434896
31	2	299.99	pendente	pendente	2025-04-12 13:38:23.764778	2025-04-12 13:38:23.764778
32	2	859.96	pendente	pendente	2025-04-21 09:55:21.236084	2025-04-21 09:55:21.236084
33	2	1199.93	pendente	pendente	2025-04-30 13:50:29.971376	2025-04-30 13:50:29.971376
34	2	249.99	pendente	pendente	2025-05-02 12:16:20.555791	2025-05-02 12:16:20.555791
35	\N	\N	pendente	pendente	2025-05-28 11:19:32.430727	2025-05-28 11:19:32.430727
36	\N	\N	pendente	pendente	2025-05-28 11:20:26.446829	2025-05-28 11:20:26.446829
37	\N	\N	pendente	pendente	2025-05-28 11:20:56.864896	2025-05-28 11:20:56.864896
38	\N	\N	pendente	pendente	2025-05-28 11:21:59.272483	2025-05-28 11:21:59.272483
39	\N	\N	pendente	pendente	2025-05-28 11:28:34.222417	2025-05-28 11:28:34.222417
40	\N	\N	pendente	pendente	2025-05-28 11:29:20.06209	2025-05-28 11:29:20.06209
41	\N	\N	pendente	pendente	2025-05-28 11:29:21.085493	2025-05-28 11:29:21.085493
42	\N	\N	pendente	pendente	2025-05-28 11:29:42.394809	2025-05-28 11:29:42.394809
43	\N	\N	pendente	pendente	2025-05-28 11:29:43.218338	2025-05-28 11:29:43.218338
44	\N	\N	pendente	pendente	2025-05-28 11:30:04.300453	2025-05-28 11:30:04.300453
45	\N	\N	pendente	pendente	2025-05-28 11:32:41.374327	2025-05-28 11:32:41.374327
46	2	2665.28	pendente	pendente	2025-05-28 12:21:21.488746	2025-05-28 12:21:21.488746
47	2	2665.28	pendente	pendente	2025-05-28 12:21:26.444846	2025-05-28 12:21:26.444846
48	2	2665.28	pendente	pendente	2025-05-28 12:21:37.385814	2025-05-28 12:21:37.385814
49	2	2665.28	pendente	pendente	2025-05-28 12:22:12.621602	2025-05-28 12:22:12.621602
50	2	2665.28	pendente	pendente	2025-05-28 13:16:49.108437	2025-05-28 13:16:49.108437
51	2	2665.28	pendente	pendente	2025-05-28 13:17:40.808009	2025-05-28 13:17:40.808009
52	2	1240.04	pendente	pendente	2025-05-30 10:56:08.331856	2025-05-30 10:56:08.331856
53	2	1240.04	pendente	pendente	2025-05-30 11:19:06.894819	2025-05-30 11:19:06.894819
54	2	1240.04	pendente	pendente	2025-05-30 11:22:20.578083	2025-05-30 11:22:20.578083
55	2	1240.04	pendente	pendente	2025-05-30 11:24:23.502654	2025-05-30 11:24:23.502654
56	2	1240.04	pendente	pendente	2025-05-31 12:22:29.536078	2025-05-31 12:22:29.536078
57	2	1240.04	pendente	pendente	2025-05-31 12:24:50.931313	2025-05-31 12:24:50.931313
58	2	1240.04	pendente	pendente	2025-05-31 12:29:43.967095	2025-05-31 12:29:43.967095
59	2	1240.04	pendente	pendente	2025-05-31 12:31:07.043679	2025-05-31 12:31:07.043679
60	2	1240.04	pendente	pendente	2025-05-31 12:34:12.646638	2025-05-31 12:34:12.646638
61	2	1240.04	pendente	pendente	2025-05-31 12:38:27.67655	2025-05-31 12:38:27.67655
63	2	1240.04	pendente	pendente	2025-05-31 12:46:22.432319	2025-05-31 12:46:22.432319
62	2	1240.04	pago	pendente	2025-05-31 12:38:32.896847	2025-05-31 12:38:32.896847
64	2	1240.04	pago	pendente	2025-05-31 12:57:41.190496	2025-05-31 12:57:41.190496
65	2	3858.68	pendente	pendente	2025-06-02 09:19:05.414559	2025-06-02 09:19:05.414559
66	2	3858.68	pendente	pendente	2025-06-02 09:30:34.577931	2025-06-02 09:30:34.577931
67	2	3858.68	pendente	pendente	2025-06-02 09:36:18.085371	2025-06-02 09:36:18.085371
68	2	3858.68	pendente	pendente	2025-06-02 09:39:29.606064	2025-06-02 09:39:29.606064
69	2	3858.68	pendente	pendente	2025-06-02 09:41:39.011405	2025-06-02 09:41:39.011405
70	2	3858.68	pendente	pendente	2025-06-02 09:43:43.707561	2025-06-02 09:43:43.707561
71	2	3858.68	pendente	pendente	2025-06-02 10:34:19.525359	2025-06-02 10:34:19.525359
72	2	3858.68	pendente	pendente	2025-06-02 10:39:38.55755	2025-06-02 10:39:38.55755
73	2	3858.68	pendente	pendente	2025-06-02 10:39:40.043349	2025-06-02 10:39:40.043349
74	2	3858.68	pendente	pendente	2025-06-02 10:48:19.607944	2025-06-02 10:48:19.607944
75	2	3858.68	pendente	pendente	2025-06-02 10:52:14.569514	2025-06-02 10:52:14.569514
76	2	1293.92	pendente	pendente	2025-06-02 11:51:45.824873	2025-06-02 11:51:45.824873
77	2	1293.92	pendente	pendente	2025-06-02 11:51:46.699998	2025-06-02 11:51:46.699998
78	2	1293.92	pendente	pendente	2025-06-02 11:55:10.01806	2025-06-02 11:55:10.01806
79	2	1293.92	pendente	pendente	2025-06-02 11:56:16.249227	2025-06-02 11:56:16.249227
80	2	512.48	pendente	pendente	2025-06-02 12:14:55.500691	2025-06-02 12:14:55.500691
81	2	512.48	pendente	pendente	2025-06-02 12:18:55.289722	2025-06-02 12:18:55.289722
82	2	512.48	pendente	pendente	2025-06-02 12:53:28.533221	2025-06-02 12:53:28.533221
83	2	512.48	pendente	pendente	2025-06-02 12:53:29.50823	2025-06-02 12:53:29.50823
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: miranda
--

COPY public.payments (id, order_id, payment_method, transaction_id, status, amount, created_at) FROM stdin;
6	20	Cartão de Crédito	TX123456789	pendente	99.99	2025-04-05 11:25:17.930079
8	22	Cartão de Crédito	TX123456789	pendente	99.99	2025-04-05 11:40:54.314565
9	23	Cartão de Crédito	TX123456789	pendente	99.99	2025-04-05 11:45:17.777706
\.


--
-- Data for Name: product_images; Type: TABLE DATA; Schema: public; Owner: miranda
--

COPY public.product_images (id, product_id, url) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: miranda
--

COPY public.products (id, nome, descricao, preco, estoque, marca, categoria, imagem_url, data_criacao, status, imagens, rating, descricao_completa, avaliacoes, old_price, caracteristicas) FROM stdin;
21	Ar Condicionado NEXYA 9000	Potente, eficiente, silencioso e elegante.	512.48	40	Nexya	Ar Condicionado	http://localhost:5173/AC_9000.webp	2025-05-15 10:42:39.669609	ativo	{http://localhost:5173/conjunto_nexya.jpg,http://localhost:5173/conjunto_nexya.jpg,http://localhost:5173/conjunto_nexya.jpg}	4.8	O Ar Condicionado NEXYA 9000 oferece desempenho de alto nível com eficiência energética e design moderno. Ideal para espaços residenciais ou comerciais de tamanho médio, proporciona um ambiente confortável em qualquer estação do ano. Com tecnologia inverter, baixo consumo de energia e operação silenciosa, é a escolha perfeita para quem procura conforto, economia e confiabilidade.	[]	622.48	{"Capacidade: 9000 BTUs","Tecnologia Inverter para maior eficiência","Baixo consumo de energia (Classe energética A+)","Operação silenciosa","Design moderno e compacto","Indicado para ambientes de até 20 m²","Funções: resfriar, aquecer, desumidificar e ventilar","Controle remoto incluso","Filtro de ar lavável","Modo Sleep para economia durante a noite"}
22	Ar Condicionado NEXYA 1200	Alta performance, Wi-Fi integrado, máxima eficiência.	551.20	40	Nexya	Ar Condicionado	http://localhost:5173/AC_1200.webp	2025-05-15 10:52:36.299121	ativo	{http://localhost:5173/conjunto_nexya.jpg,http://localhost:5173/conjunto_nexya.jpg,http://localhost:5173/conjunto_nexya.jpg}	4.8	O Nexya One 1200 é a solução ideal para quem procura conforto, desempenho e tecnologia de ponta. Com uma capacidade superior de refrigeração, é perfeito para climatizar ambientes amplos de forma rápida e eficiente.Este modelo conta com conectividade Wi-Fi integrada, permitindo que o utilizador controle todas as funcionalidades remotamente através de uma aplicação no smartphone, garantindo praticidade no dia a dia. A sua interface intuitiva e modos inteligentes de operação oferecem uma experiência personalizada de climatização.Além do excelente desempenho térmico, o Nexya One 1200 destaca-se pela eficiência energética e pelo funcionamento silencioso, tornando-o ideal para uso residencial ou profissional. O seu design elegante e discreto integra-se facilmente em qualquer espaço.Equipado com filtros de purificação de ar e funções avançadas como modo sleep, turbo e programação, o Nexya One 1200 oferece muito mais que refrigeração: oferece bem-estar e qualidade de vida.	[]	641.20	{"Capacidade: 12000 BTUs","Tecnologia Inverter para maior eficiência energética","Baixo consumo de energia (Classe energética A+)","Operação silenciosa","Design moderno e compacto","Indicado para ambientes de até 30 m²","Funções: resfriar, aquecer, desumidificar e ventilar","Controle remoto incluso","Filtro de ar lavável","Modo Sleep para economia durante a noite","Timer programável","Auto limpeza para evitar mofo e odores"}
23	Ar Condicionado NEXYA 1800	Alta performance, Wi-Fi integrado, máxima eficiência.	1006.78	40	Nexya	Ar Condicionado	http://localhost:5173/AC_1200.webp	2025-05-15 11:16:25.118736	ativo	{http://localhost:5173/conjunto_nexya.jpg,http://localhost:5173/conjunto_nexya.jpg,http://localhost:5173/conjunto_nexya.jpg}	5.0	O Ar Condicionado NEXYA 1800 é um modelo split inverter com capacidade de 18.000 BTU/h, ideal para ambientes de até 35 m². Utiliza gás refrigerante R32, que é eficiente e ecológico. Possui funções de refrigeração, aquecimento, ventilação e desumidificação, além do modo automático.\n\nConta com controle remoto e é compatível com controle via Wi-Fi (kit vendido separadamente), oferecendo praticidade no ajuste da temperatura pelo smartphone. Tem timer programável de até 24 horas, função eco para economia de energia, função noite para operação silenciosa e filtro de ar lavável para melhor qualidade do ar.\n\nDesign compacto com display LED e função autolimpeza, que mantém o aparelho sempre eficiente. As unidades interna e externa são leves e fáceis de instalar.	[]	1200.78	{"Tecnologia inverter para maior eficiência energética","Capacidade de 18.000 BTU/h para ambientes até 45 m²","Funções de refrigeração, aquecimento e desumidificação","Operação silenciosa para conforto total","Design moderno e compacto","Controle remoto com timer programável","Modo sleep para economia de energia durante a noite","Filtro anti-poeira e fácil manutenção","Sistema de auto limpeza para maior durabilidade"}
27	Reyee switch 5 portas	10/100/1000 S/GESTÃO	46.84	40	GIGBIT	Switch	http://localhost:5173/switch.jpg	2025-05-17 09:44:02.181278	ativo	{http://localhost:5173/switch.jpg,http://localhost:5173/switch.jpg,http://localhost:5173/switch.jpg}	5.0	O Switch Reyee 5 Portas Gigabit é a solução ideal para quem busca alto desempenho, estabilidade e facilidade de expansão em redes residenciais ou corporativas. Com cinco portas Ethernet de 10/100/1000 Mbps, ele garante transmissão de dados em alta velocidade, sendo perfeito para aplicações que exigem maior largura de banda, como streaming em HD, videoconferências, jogos online e transferência de arquivos pesados.	[]	66.84	{"5 portas Ethernet Gigabit 10/100/1000 Mbps","Alto desempenho e estabilidade para redes residenciais e corporativas","Suporte para transmissão de dados em alta velocidade","Ideal para streaming em HD, videoconferências e jogos online","Facilidade de expansão da rede","Compatível com múltiplos dispositivos simultaneamente","Baixa latência e alta confiabilidade na conexão","Design compacto e fácil instalação"}
28	Reyee switch 8  portas	10/100/1000 S/GESTÃO	53.25	40	GIGBIT	Switch	http://localhost:5173/switch_8_4.avif	2025-05-17 09:48:08.832945	ativo	{http://localhost:5173/switch_8.jpg,http://localhost:5173/switch_8.jpg,http://localhost:5173/switch_8.jpg}	5.0	O Switch Reyee 8 Portas Gigabit é uma solução eficiente para expandir redes com alto desempenho e estabilidade. Com 8 portas Ethernet 10/100/1000 Mbps, oferece conexões rápidas e seguras para múltiplos dispositivos, como PCs, impressoras, câmeras IP e roteadores.\\n\\nSua instalação é plug and play, sem necessidade de configuração. Possui design compacto e robusto, ideal para ambientes residenciais ou comerciais. Com funcionamento silencioso e baixo consumo de energia, é perfeito para quem busca uma rede confiável e de alta velocidade.	[]	72.85	{"8 portas Ethernet Gigabit 10/100/1000 Mbps","Alto desempenho e estabilidade para redes residenciais e comerciais","Conexões rápidas e seguras para múltiplos dispositivos","Compatível com PCs, impressoras, câmeras IP e roteadores","Instalação plug and play, sem necessidade de configuração","Design compacto e robusto","Funcionamento silencioso","Baixo consumo de energia","Ideal para ambientes residenciais e comerciais"}
25	EZVIZ Câmara de Segurança	Wi-Fi, Full HD, Visão Noturna, Sem Fios, Exterior	233.26	40	EZVIZ	Câmara Segurança	http://localhost:5173/ezviz_galeria_1.jpg	2025-05-15 11:53:51.454466	ativo	{http://localhost:5173/ezviz_galeria_1.jpg,http://localhost:5173/ezviz_galeria_2.webp,http://localhost:5173/ezviz_galeria_3.webp}	5.0	A EZVIZ CS-BC1C é uma câmara de segurança Wi-Fi recarregável, ideal para monitorização de exteriores. Com resolução Full HD 1080p, visão noturna a cores e deteção de movimento com IA, garante imagens nítidas e alertas inteligentes dia e noite.\n\nO design sem fios com bateria de longa duração (até 210 dias) permite instalação fácil e flexível, sem necessidade de cabos ou furos. Resistente às intempéries com classificação IP66, está pronta para enfrentar sol, chuva ou poeira.\n\nCompatível com assistentes de voz (Alexa e Google Assistant), oferece visualização remota em tempo real através da app EZVIZ. A segurança está sempre à distância de um toque.	[]	286.20	{"Câmara Wi-Fi recarregável, sem fios para fácil instalação","Resolução Full HD 1080p para imagens nítidas","Visão noturna a cores para monitorização clara durante a noite","Deteção de movimento com inteligência artificial (IA) para alertas precisos","Bateria de longa duração, até 210 dias sem recarga","Design resistente às intempéries com classificação IP66 (proteção contra água e poeira)","Compatível com assistentes de voz Alexa e Google Assistant","Visualização remota em tempo real via app EZVIZ","Instalação flexível, sem necessidade de cabos ou furos","Alertas inteligentes para notificar eventos suspeitos"}
24	Ar Condicionado NEXYA 2400	Alta performance, Wi-Fi integrado, máxima eficiência.	1304.16	40	Nexya	Ar Condicionado	http://localhost:5173/AC_1200.webp	2025-05-15 11:33:28.551503	ativo	{http://localhost:5173/conjunto_nexya.jpg,http://localhost:5173/conjunto_nexya.jpg,http://localhost:5173/conjunto_nexya.jpg}	4.8	Conforto e eficiência com controlo total via Wi-Fi.\n\nO Ar Condicionado Nexya 2400 One WiFi da Olimpia Splendid é a solução ideal para quem procura climatização potente, silenciosa e conectada. Com capacidade de 9.000 BTU/h, é perfeito para ambientes até 25 m², garantindo conforto térmico durante todo o ano.\n\nGraças à tecnologia inverter, o Nexya 2400 One WiFi oferece maior eficiência energética e menor consumo, mantendo a temperatura estável com menos oscilações. O seu design elegante e compacto integra-se perfeitamente em qualquer espaço.\n\nA funcionalidade Wi-Fi integrada permite controlar o equipamento remotamente através do smartphone, oferecendo praticidade e flexibilidade no dia a dia. Além disso, o modo silencioso, o temporizador e o filtro de ar lavável garantem maior conforto e qualidade do ar.	[]	1400.16	{"Tecnologia inverter para alta eficiência energética","Capacidade de 24.000 BTU/h ideal para ambientes até 60 m²","Funções de refrigeração, aquecimento e desumidificação","Operação silenciosa para máximo conforto","Controle remoto com display digital","Filtro anti-poeira removível e lavável","Modo sleep para economia de energia durante a noite","Design moderno e compacto que se adapta a qualquer ambiente","Sistema de auto limpeza para maior durabilidade","Função turbo para resfriamento rápido"}
26	Uniview Kit Videoporteiro	Placa IP + Monitor + Switch	863.76	40	Uniview	Câmara Segurança	http://localhost:5173/KIT_VIDEO_PORTEIRO.jpg	2025-05-17 09:33:59.735504	ativo	{http://localhost:5173/KIT_VIDEO_PORTEIRO.jpg,http://localhost:5173/KIT_VIDEO_PORTEIRO.jpg,http://localhost:5173/KIT_VIDEO_PORTEIRO.jpg}	5.0	O Kit Videoporteiro IP Uniview é uma solução completa de segurança e controle de acesso, composta por uma placa externa com câmera integrada, um monitor interno com tela sensível ao toque e um switch PoE para alimentação e comunicação entre os dispositivos via rede. Desenvolvido para uso residencial ou comercial, o kit oferece praticidade, qualidade de imagem e tecnologia de ponta em um único conjunto.\n\nA placa externa possui câmera de alta definição com lente grande angular, permitindo uma ampla visualização da área externa. Conta com microfone, alto-falante e botão de chamada com iluminação, além de proteção contra intempéries (IP65 ou superior), sendo ideal para instalação em ambientes externos. O monitor interno possui uma tela touchscreen de 7 polegadas com interface intuitiva, permitindo visualizar em tempo real as imagens da câmera externa, atender chamadas e se comunicar com visitantes de forma clara e eficiente. Também possibilita integração com câmeras IP adicionais da Uniview, além de recursos como gravação de chamadas e captura de imagem (variando conforme o modelo).	[]	986.20	{"Placa externa com câmera integrada de alta definição e lente grande angular","Monitor interno touchscreen de 7 polegadas com interface intuitiva","Switch PoE para alimentação e comunicação via rede","Microfone, alto-falante e botão de chamada com iluminação na placa externa","Proteção contra intempéries com classificação IP65 ou superior","Ideal para uso residencial ou comercial","Visualização em tempo real das imagens da câmera externa pelo monitor","Comunicação clara e eficiente entre monitor e visitante","Integração com câmeras IP adicionais da Uniview","Recursos de gravação de chamadas e captura de imagem (modelo variável)"}
31	HTW Bomba Calor 300L	300L inox c/ serpentina	1919.54	40	GIGABIT	Bombas de Calor	http://localhost:5173/bomba_calor.jpg	2025-05-17 10:35:01.576911	ativo	{http://localhost:5173/bomba_calor.jpg,http://localhost:5173/bomba_calor.jpg,http://localhost:5173/bomba_calor.jpg}	5.0	A HTW Bomba de Calor 300L é uma solução eficiente, ecológica e económica para o aquecimento de água sanitária em residências e pequenas empresas. Com capacidade para 300 litros, este sistema é ideal para famílias de média a grande dimensão, proporcionando água quente de forma constante e com baixo consumo energético.\n\nUtilizando tecnologia de bomba de calor, o equipamento aproveita o calor do ar ambiente para aquecer a água, reduzindo significativamente o consumo elétrico em comparação com sistemas tradicionais. Com classe energética A+, garante excelente desempenho e economia a longo prazo, contribuindo ainda para a redução da pegada de carbono.\n\nEquipada com resistência elétrica de apoio, a bomba assegura água quente mesmo em dias mais frios ou de maior consumo. O seu painel de controlo digital facilita o ajuste da temperatura e a programação do funcionamento, oferecendo total controlo e conforto ao utilizador.	[]	1950.06	{"Capacidade para 300 litros","Solução eficiente, ecológica e económica para aquecimento de água sanitária","Ideal para residências e pequenas empresas","Tecnologia de bomba de calor que aproveita o calor do ar ambiente","Reduz significativamente o consumo elétrico comparado a sistemas tradicionais","Classe energética A+ para excelente desempenho e economia a longo prazo","Contribui para a redução da pegada de carbono","Resistência elétrica de apoio para garantir água quente em dias frios ou de maior consumo","Painel de controlo digital para ajuste de temperatura e programação","Fácil controlo e conforto para o utilizador"}
29	Reyee switch 4 portas	PoE + 1RJ45 C/GESTÃO CLOUD	95.92	40	GIGBIT	Switch	http://localhost:5173/switch_4_rj45.webp	2025-05-17 10:04:21.060106	ativo	{http://localhost:5173/switch_4_rj45.webp,http://localhost:5173/switch_4_rj45.webp,http://localhost:5173/switch_4_rj45.webp}	5.0	O Switch Reyee 4 Portas PoE + 1 Porta RJ45 com Gestão Cloud é uma solução inteligente para redes que exigem praticidade, controle e eficiência energética. Com 4 portas PoE de 10/100 Mbps e 1 porta RJ45 uplink, permite alimentar dispositivos como câmeras IP, pontos de acesso e telefones VoIP diretamente pelo cabo de rede, eliminando a necessidade de fontes externas.\n\nEste modelo possui gestão via nuvem (Cloud Management) através da plataforma da Reyee, permitindo monitoramento e configuração remota com facilidade, ideal para integradores e administradores de rede. Conta ainda com funções inteligentes de gerenciamento, como VLAN, QoS e monitoramento de tráfego.\n\nCompacto, silencioso e de fácil instalação (plug and play), é perfeito para ambientes profissionais, residenciais, lojas, escritórios ou sistemas de videovigilância.	[]	115.92	{"4 portas PoE 10/100 Mbps para alimentar dispositivos via cabo de rede","1 porta RJ45 uplink para conexão de alta velocidade","Gestão via nuvem (Cloud Management) pela plataforma Reyee","Monitoramento e configuração remota fácil","Funções inteligentes de gerenciamento: VLAN, QoS e monitoramento de tráfego","Elimina a necessidade de fontes de energia externas para dispositivos PoE","Compacto e silencioso","Fácil instalação plug and play","Ideal para ambientes profissionais, residenciais, lojas e escritórios","Perfeito para sistemas de videovigilância e redes integradas"}
30	Reyee ponto de acesso GIGABIT	Wifi 5 2.4 E 5GHz 1300 MBPS	150.06	40	GIGABIT	Switch	http://localhost:5173/ponto_acesso.webp	2025-05-17 10:20:20.958361	ativo	{http://localhost:5173/ponto_acesso.webp,http://localhost:5173/ponto_acesso.webp,http://localhost:5173/ponto_acesso.webp}	5.0	O Ponto de Acesso Gigabit Wi-Fi 5 Dual Band é a solução ideal para ampliar a cobertura e a qualidade da rede sem fio em ambientes residenciais ou empresariais. Compatível com o padrão 802.11ac (Wi-Fi 5), oferece velocidades combinadas de até 1300Mbps, distribuídas entre 2.4GHz (até 450Mbps) e 5GHz (até 867Mbps), garantindo desempenho superior em navegação, streaming, videoconferência e jogos online.\n\nEquipado com porta Gigabit Ethernet, o dispositivo garante máxima velocidade também na conexão cabeada, sendo perfeito para redes de alto desempenho. Seu design compacto e moderno permite instalação discreta em paredes ou tetos, e a configuração é simples e rápida, com suporte a gerenciamento centralizado via software ou plataforma cloud (dependendo do fabricante/modelo).	[]	170.06	{"Compatível com padrão 802.11ac (Wi-Fi 5)","Velocidade combinada de até 1300Mbps (2.4GHz até 450Mbps e 5GHz até 867Mbps)","Porta Gigabit Ethernet para conexão cabeada de alta velocidade","Ideal para navegação, streaming, videoconferência e jogos online","Design compacto e moderno para instalação discreta em paredes ou tetos","Configuração simples e rápida","Suporte a gerenciamento centralizado via software ou plataforma cloud","Perfeito para ambientes residenciais ou empresariais que buscam alto desempenho","Ampla cobertura e qualidade da rede sem fio"}
\.


--
-- Data for Name: shipping_details; Type: TABLE DATA; Schema: public; Owner: miranda
--

COPY public.shipping_details (id, order_id, full_name, address, city, zip_code, country, phone, tracking_number, status) FROM stdin;
2	9	John Doe	123 Main St	Lisbon	1000-000	Portugal	912345678	XYZ123	pendente
3	10	John Doe	123 Main St	Lisbon	1000-000	Portugal	912345678	XYZ123	pendente
4	11	João Silva	Rua das Flores, 123	Lisboa	1000-000	Portugal	+351912345678	AB123456789PT	pendente
5	12	João Silva	Rua das Flores, 123	Lisboa	1000-000	Portugal	+351912345678	AB123456789PT	pendente
6	13	João Silva	Rua das Flores, 123	Lisboa	1000-000	Portugal	+351912345678	AB123456789PT	pendente
7	14	João Silva	Rua das Flores, 123	Lisboa	1000-000	Portugal	+351912345678	AB123456789PT	pendente
8	15	João Silva	Rua das Flores, 123	Lisboa	1000-000	Portugal	+351912345678	AB123456789PT	pendente
9	16	João Silva	Rua das Flores, 123	Lisboa	1000-000	Portugal	+351912345678	AB123456789PT	pendente
10	17	João Silva	Rua das Flores, 123	Lisboa	1000-000	Portugal	+351912345678	AB123456789PT	pendente
11	18	João Silva	Rua das Flores, 123	Lisboa	1000-000	Portugal	+351912345678	AB123456789PT	pendente
12	19	João Silva	Rua das Flores, 123	Lisboa	1000-000	Portugal	+351912345678	AB123456789PT	pendente
13	20	João Silva	Rua das Flores, 123	Lisboa	1000-000	Portugal	+351912345678	AB123456789PT	pendente
14	21	Rodrigo Miranda	Estrad das Eiras nº34 	Santana	9230-118	Portugal	966545381	\N	pendente
15	22	João Silva	Rua das Flores, 123	Lisboa	1000-000	Portugal	+351912345678	\N	pendente
16	23	João Silva	Rua das Flores, 123	Lisboa	1000-000	Portugal	+351912345678	\N	pendente
17	24	João Silva	Rua das Flores, 123	Lisboa	1000-000	Portugal	+351912345678	\N	pendente
18	25	João Silva	Rua das Flores, 123	Lisboa	1000-000	Portugal	+351912345678	\N	pendente
19	26	Rodrigo Miranda	Estrad das Eiras nº34 	Santana	9230-118	Portugal	966545381	\N	pendente
20	27	Rodrigo Caldeira Miranda	Estrad das Eiras nº34 	Santana	9230-118	Portugal	966545381	\N	pendente
21	28	Rodrigo Miranda	Estrada das Eiras nº34	Santana	9230-118	Portugal	962515190	\N	pendente
22	29	Rodrigo Miranda	Estrad das Eiras nº34 	Santana	9230-118	Portugal	966545381	\N	pendente
23	30	Rodrigo Miranda	Estrad das Eiras nº34 	Santana	9230-118	Portugal	966545381	\N	pendente
24	31	Rodrigo Miranda	Estrad das Eiras nº34 	Santana	9230-118	Portugal	966545381	\N	pendente
25	32	Rodrigo Miranda	Estrad das Eiras nº34 	Santana	9230-118	Portugal	962515190	\N	pendente
26	33	Rodrigo Miranda	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
27	34	Rodrigo Miranda	Estra das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
29	37	João Silva	Rua das Flores, 10	Lisboa	1000-000	PT	\N	\N	pendente
30	38	João Silva	Rua das Flores, 10	Lisboa	1000-000	PT	\N	\N	pendente
31	39	João Silva	Rua das Flores, 10	Lisboa	1000-000	PT	\N	\N	pendente
32	40	João Silva	Rua das Flores, 10	Lisboa	1000-000	PT	\N	\N	pendente
33	41	João Silva	Rua das Flores, 10	Lisboa	1000-000	PT	\N	\N	pendente
34	42	João Silva	Rua das Flores, 10	Lisboa	1000-000	PT	\N	\N	pendente
35	43	João Silva	Rua das Flores, 10	Lisboa	1000-000	PT	\N	\N	pendente
36	44	João Silva	Rua das Flores, 10	Lisboa	1000-000	PT	\N	\N	pendente
37	45	João Silva	Rua das Flores, 10	Lisboa	1000-000	PT	\N	\N	pendente
38	46	Rodrigo	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
39	47	Rodrigo	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
40	48	Rodrigo	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
41	49	Rodrigo	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
42	50	Rodrigo	Estrada das Eiras nº34 	Santana	9230-118	Portugal	966545381	\N	pendente
43	51	Rodrigo	Estrada das Eiras nº34 	Santana	9230-118	Portugal	966545381	\N	pendente
44	52	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
45	53	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
46	54	Rodrigo	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
47	55	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
48	56	Rodrigo	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
49	57	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
50	58	teste	teste	Santana	9230-118	Portugal	966545381	\N	pendente
51	59	teste	Estrada das Eiras nº34	santana	9230-118	Portugal	966545831	\N	pendente
52	60	teste 2	Estrada das Eiras nº34	santana	9230-118	Portugal	966545381	\N	pendente
53	61	teste 3 	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
54	62	teste 3 	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
55	63	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
56	64	teste final	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
57	65	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	Santana	9230-118	Portugal	96654381	\N	pendente
58	66	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	Funchal	9230-118	Portugal	966545381	\N	pendente
59	67	Rodrigo	Estrada das Eiras nº34	Funchal	9230-118	Portugal	966545381	\N	pendente
60	68	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	Funchal	9230-118	Portugal	966545381	\N	pendente
61	69	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	Funchal	9230-118	Portugal	966545381	\N	pendente
62	70	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	Funchal	9230-118	Portugal	966545381	\N	pendente
63	71	Rodrigo	Estrada das Eiras nº34	Funchal	9230-118	Portugal	966545381	\N	pendente
64	72	Rodrigo	Estrada das Eiras nº34	Funchal	9230-118	Portugal	966545381	\N	pendente
65	73	Rodrigo	Estrada das Eiras nº34	Funchal	9230-118	Portugal	966545381	\N	pendente
66	74	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	Funchal	9230-118	Portugal	966545381	\N	pendente
67	75	Rodrigo	Estrada das Eiras nº34	Funchal	9230-118	Portugal	966545381	\N	pendente
68	76	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
69	77	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
70	78	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	Funchal	9230-118	Portugal	966545381	\N	pendente
71	79	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	Funchal	9230-118	Portugal	966545381	\N	pendente
72	80	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	9230-118	9230-118	Portugal	966545381	\N	pendente
73	81	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	Funchal	9230-118	Portugal	966545381	\N	pendente
74	82	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
75	83	Rodrigo Caldeira Miranda	Estrada das Eiras nº34	Santana	9230-118	Portugal	966545381	\N	pendente
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: miranda
--

COPY public.users (id, nome, email, senha, data_criacao, status, endereco, telefone) FROM stdin;
1	João Silva	joao@example.com	$2b$10$fwqKwLeS7vxWQ9jWgOMBx.39xRt3LDDQ7QzYHZXh05MdLK2Yt4c1u	2025-03-25 11:32:24.086113	ativo	Rua A, 123	123456789
2	Rodrigo Miranda	rodrigomt@sapo.pt	$2b$10$9Ue9qx4eRXz5WmO9b/GTlOSG5rER6R3tOLJVUlUUTx2RlQNMBuvwa	2025-03-25 11:56:00.407268	ativo	Estrada das Eiras nº34, Santana 	+351966545381
4	Rodrigo Caldeira Miranda	rodrigoteste@gmail.com	$2b$10$ewj8P6xayPc89s1JsOeEDeHbYvgcAd9Cv0sSc9MBvhwWAIumhY86m	2025-04-01 20:14:04.4472	ativo	\N	\N
5	Rodrigo Miranda	rodrigo.miranda@eupago.pt	$2b$10$GwA97GTEsXK8kJBaaEFUAuGuTL2VHLWID2yRNsf7NPtV6c.9GLr4.	2025-04-21 10:24:11.862733	ativo	Rua das Flores, 123	912345678
6	beatriz	beatriz@gmail.com	$2b$10$YiB.GXswE7I34ee7Tn1NH.uEiuKNfzQW1cWpS9QMEt1iYXZO.xqxu	2025-04-21 10:30:26.336953	ativo	Estrada das Eiras nº34, 34	932475800
7	TESTE	teste@gmail.com	$2b$10$gs7lwe0vNh8hK5LJPg6cu.i2N8Q1EQDmeNbq4WJhe2kqk.5rCWhMK	2025-04-25 11:52:45.923859	ativo	Estrada das Eiras nº34, 34	966545381
8	teste	teste3@gmail.com	$2b$10$4Pr9iccVGOi6Y1o3yi/vFOkJYcYL.81yD0Sz.M9gGXKBePC/wE0bq	2025-04-30 14:16:15.314873	ativo	Estrada das Eiras nº34, 34	966545381
\.


--
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: miranda
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 89, true);


--
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: miranda
--

SELECT pg_catalog.setval('public.carts_id_seq', 8, true);


--
-- Name: favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: miranda
--

SELECT pg_catalog.setval('public.favorites_id_seq', 60, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: miranda
--

SELECT pg_catalog.setval('public.order_items_id_seq', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: miranda
--

SELECT pg_catalog.setval('public.orders_id_seq', 83, true);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: miranda
--

SELECT pg_catalog.setval('public.payments_id_seq', 10, true);


--
-- Name: product_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: miranda
--

SELECT pg_catalog.setval('public.product_images_id_seq', 4, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: miranda
--

SELECT pg_catalog.setval('public.products_id_seq', 31, true);


--
-- Name: shipping_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: miranda
--

SELECT pg_catalog.setval('public.shipping_details_id_seq', 75, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: miranda
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: product_images product_images_pkey; Type: CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: shipping_details shipping_details_pkey; Type: CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.shipping_details
    ADD CONSTRAINT shipping_details_pkey PRIMARY KEY (id);


--
-- Name: carts unique_cart_id; Type: CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT unique_cart_id UNIQUE (cart_id);


--
-- Name: favorites unique_favorite; Type: CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT unique_favorite UNIQUE (user_id, produto_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: cart_items cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(cart_id) ON DELETE CASCADE;


--
-- Name: carts carts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: favorites favorites_produto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: favorites favorites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: payments payments_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: product_images product_images_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: shipping_details shipping_details_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: miranda
--

ALTER TABLE ONLY public.shipping_details
    ADD CONSTRAINT shipping_details_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

