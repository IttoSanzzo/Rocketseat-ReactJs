import { forwardRef } from "react";

const createComponent = {
	button: (className?: string) =>
		forwardRef<HTMLButtonElement,React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => (
			<button
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	div: (className?: string) =>
		forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
			<div
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	span: (className?: string) =>
		forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>((props, ref) => (
			<span
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	p: (className?: string) =>
		forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>((props, ref) => (
			<p
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	h1: (className?: string) =>
		forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>((props, ref) => (
			<h1
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	h2: (className?: string) =>
		forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>((props, ref) => (
			<h2
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	h3: (className?: string) =>
		forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>((props, ref) => (
			<h3
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	h4: (className?: string) =>
		forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>((props, ref) => (
			<h4
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	h5: (className?: string) =>
		forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>((props, ref) => (
			<h5
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	h6: (className?: string) =>
		forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>((props, ref) => (
			<h6
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),

	ul: (className?: string) =>
		forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>((props, ref) => (
			<ul
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	ol: (className?: string) =>
		forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>((props, ref) => (
			<ol
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	li: (className?: string) =>
		forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>((props, ref) => (
			<li
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	input: (className?: string) =>
		forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
			<input
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	textarea: (className?: string) =>
		forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>((props, ref) => (
			<textarea
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	select: (className?: string) =>
		forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>((props, ref) => (
			<select
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	option: (className?: string) =>
		forwardRef<HTMLOptionElement, React.OptionHTMLAttributes<HTMLOptionElement>>((props, ref) => (
			<option
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	label: (className?: string) =>
		forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>((props, ref) => (
			<label
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	form: (className?: string) =>
		forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement>>((props, ref) => (
			<form
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	table: (className?: string) =>
		forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>((props, ref) => (
			<table
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	thead: (className?: string) =>
		forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>((props, ref) => (
			<thead
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	tbody: (className?: string) =>
		forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>((props, ref) => (
			<tbody
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	tr: (className?: string) =>
		forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>((props, ref) => (
			<tr
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	td: (className?: string) =>
		forwardRef<HTMLTableDataCellElement, React.TdHTMLAttributes<HTMLTableDataCellElement>>((props, ref) => (
			<td
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	th: (className?: string) =>
		forwardRef<HTMLTableHeaderCellElement, React.ThHTMLAttributes<HTMLTableHeaderCellElement>>((props, ref) => (
			<th
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	img: (className?: string) =>
		forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>((props, ref) => (
			<img
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	a: (className?: string) =>
		forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>((props, ref) => (
			<a
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
	)),
	header: (className?: string) =>
		forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => (
			<header
				{...props}
				ref={ref}
				className={`${className} ${props.className || ""}`}
			/>
		)),
	main: (className?: string) =>
		forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => (
			<main
				{...props}
				ref={ref}
				className={`${className} ${props.className || ''}`}
			/>
		))
};

export default createComponent;
